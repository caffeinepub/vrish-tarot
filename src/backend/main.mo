import Text "mo:core/Text";
import Array "mo:core/Array";
import Order "mo:core/Order";
import List "mo:core/List";
import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import Iter "mo:core/Iter";
import Time "mo:core/Time";
import Int "mo:core/Int";
import Principal "mo:core/Principal";
import Nat "mo:core/Nat";

import AccessControl "authorization/access-control";
import MixinAuthorization "authorization/MixinAuthorization";



actor {
  // Initialize the user system state
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  type SessionType = {
    id : Nat;
    name : Text;
    durationMinutes : Nat;
    priceUSD : Nat;
    description : Text;
    iconName : Text;
  };

  module SessionType {
    public func compare(st1 : SessionType, st2 : SessionType) : Order.Order {
      Nat.compare(st1.id, st2.id);
    };
  };

  type BookingStatus = {
    #pending;
    #confirmed;
    #cancelled;
  };

  module BookingStatus {
    public func compare(s1 : BookingStatus, s2 : BookingStatus) : Order.Order {
      switch (s1, s2) {
        case (#pending, #pending) { #equal };
        case (#pending, _) { #less };
        case (#confirmed, #pending) { #greater };
        case (#confirmed, #confirmed) { #equal };
        case (#confirmed, #cancelled) { #less };
        case (#cancelled, #cancelled) { #equal };
        case (#cancelled, _) { #greater };
      };
    };
  };

  type Booking = {
    id : Nat;
    name : Text;
    email : Text;
    phone : Text;
    sessionID : Nat;
    date : Text;
    time : Text;
    message : Text;
    status : BookingStatus;
    timestamp : Time.Time;
  };

  module Booking {
    public func compare(b1 : Booking, b2 : Booking) : Order.Order {
      Int.compare(b1.timestamp, b2.timestamp);
    };
  };

  type SiteSettings = {
    phoneNumber : Text;
    instagramHandle : Text;
  };

  type Testimonial = {
    customerName : Text;
    testimonialText : Text;
    starRating : Nat;
    avatarInitials : Text;
  };

  module Testimonial {
    public func compare(t1 : Testimonial, t2 : Testimonial) : Order.Order {
      Text.compare(t1.customerName, t2.customerName);
    };
  };

  public type UserProfile = {
    name : Text;
  };

  let userProfiles = Map.empty<Principal, UserProfile>();

  var sessionCounter = 0;
  var bookingCounter = 0;

  let sessionTypes = Map.empty<Nat, SessionType>();

  let bookings = Map.empty<Nat, Booking>();
  let testimonials = List.empty<Testimonial>();

  var availableTimeSlots = [
    "9:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
    "5:00 PM",
    "6:00 PM",
  ];

  var siteSettings : SiteSettings = {
    phoneNumber = "+1-234-567-890";
    instagramHandle = "@vrish_tarot";
  };

  // User profile management
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Time slot management
  public shared ({ caller }) func updateTimeSlots(newTimeSlots : [Text]) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update time slots");
    };
    if (newTimeSlots.size() == 0) {
      Runtime.trap("Time slots cannot be empty");
    };
    availableTimeSlots := newTimeSlots;
  };

  public query ({ caller }) func getTimeSlots() : async [Text] {
    availableTimeSlots;
  };

  // Booking management
  public type CreateBookingRequestArgs = {
    name : Text;
    email : Text;
    phone : Text;
    sessionID : Nat;
    date : Text;
    time : Text;
    message : Text;
  };

  public shared ({ caller }) func createBookingRequest(args : CreateBookingRequestArgs) : async {
    #success : { bookingID : Nat };
    #sessionTypeNotFound;
    #missingFields : Text;
  } {
    if (args.name == "" or args.email == "" or args.phone == "" or args.date == "" or args.time == "") {
      return #missingFields("All fields are required");
    };

    if (not sessionTypes.containsKey(args.sessionID)) {
      return #sessionTypeNotFound;
    };

    let bookingID = bookingCounter;
    let booking : Booking = {
      id = bookingID;
      name = args.name;
      email = args.email;
      phone = args.phone;
      sessionID = args.sessionID;
      date = args.date;
      time = args.time;
      message = args.message;
      status = #pending;
      timestamp = Time.now();
    };

    bookings.add(bookingID, booking);
    bookingCounter += 1;
    #success { bookingID };
  };

  public shared ({ caller }) func updateBookingStatus(bookingID : Nat, newStatus : BookingStatus) : async {
    #success;
    #bookingNotFound;
  } {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update booking status");
    };

    switch (bookings.get(bookingID)) {
      case (null) { #bookingNotFound };
      case (?booking) {
        let updatedBooking = { booking with status = newStatus };
        bookings.add(bookingID, updatedBooking);
        #success;
      };
    };
  };

  public query ({ caller }) func getBookings() : async [Booking] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view all bookings");
    };
    bookings.values().toArray().sort();
  };

  // Session type management
  public type CreateSessionArgs = {
    name : Text;
    durationMinutes : Nat;
    priceUSD : Nat;
    description : Text;
    iconName : Text;
  };

  public shared ({ caller }) func createSessionType(args : CreateSessionArgs) : async {
    #success : { sessionID : Nat };
    #missingFields : Text;
  } {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can create session types");
    };

    if (args.name == "" or args.description == "" or args.iconName == "") {
      return #missingFields("All fields are required");
    };

    let sessionID = sessionCounter;
    let session : SessionType = {
      id = sessionID;
      name = args.name;
      durationMinutes = args.durationMinutes;
      priceUSD = args.priceUSD;
      description = args.description;
      iconName = args.iconName;
    };

    sessionTypes.add(sessionID, session);
    sessionCounter += 1;
    #success { sessionID };
  };

  public shared ({ caller }) func updateSessionType(sessionID : Nat, args : CreateSessionArgs) : async {
    #success;
    #sessionTypeNotFound;
    #missingFields : Text;
  } {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update session types");
    };

    if (args.name == "" or args.description == "" or args.iconName == "") {
      return #missingFields("All fields are required");
    };

    switch (sessionTypes.get(sessionID)) {
      case (null) { #sessionTypeNotFound };
      case (_) {
        let updatedSession = {
          id = sessionID;
          name = args.name;
          durationMinutes = args.durationMinutes;
          priceUSD = args.priceUSD;
          description = args.description;
          iconName = args.iconName;
        };
        sessionTypes.add(sessionID, updatedSession);
        #success;
      };
    };
  };

  public shared ({ caller }) func deleteSessionType(sessionID : Nat) : async {
    #success;
    #sessionTypeNotFound;
  } {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete session types");
    };

    if (not sessionTypes.containsKey(sessionID)) {
      return #sessionTypeNotFound;
    };

    sessionTypes.remove(sessionID);
    #success;
  };

  public query ({ caller }) func getSessionTypes() : async [SessionType] {
    sessionTypes.values().toArray().sort();
  };

  public query ({ caller }) func getSessionType(sessionID : Nat) : async ?SessionType {
    sessionTypes.get(sessionID);
  };

  // Site settings
  public type UpdateSettingsArgs = {
    phoneNumber : Text;
    instagramHandle : Text;
  };

  public shared ({ caller }) func updateSiteSettings(args : UpdateSettingsArgs) : async {
    #success;
    #missingFields : Text;
  } {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update site settings");
    };

    if (args.phoneNumber == "" or args.instagramHandle == "") {
      return #missingFields("All fields are required");
    };

    siteSettings := {
      phoneNumber = args.phoneNumber;
      instagramHandle = args.instagramHandle;
    };

    #success;
  };

  public query ({ caller }) func getSiteSettings() : async SiteSettings {
    siteSettings;
  };

  // Testimonials
  public shared ({ caller }) func seedBackupTestimonials() : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can seed testimonials");
    };

    switch (testimonials.size()) {
      case (0) {
        testimonials.add(
          {
            customerName = "Alice Smith";
            testimonialText = "Amazing reading, very insightful!";
            starRating = 5;
            avatarInitials = "AS";
          },
        );
        testimonials.add(
          {
            customerName = "Bob Johnson";
            testimonialText = "Helped me gain clarity in my relationship.";
            starRating = 4;
            avatarInitials = "BJ";
          },
        );
        testimonials.add(
          {
            customerName = "Cathy Lee";
            testimonialText = "Guidance was spot on, highly recommend!";
            starRating = 5;
            avatarInitials = "CL";
          },
        );
        testimonials.add(
          {
            customerName = "David Kim";
            testimonialText = "Professional and empathetic reader.";
            starRating = 5;
            avatarInitials = "DK";
          },
        );
        testimonials.add(
          {
            customerName = "Emily Turner";
            testimonialText = "Provided clarity during a tough time.";
            starRating = 4;
            avatarInitials = "ET";
          },
        );
        testimonials.add(
          {
            customerName = "Frank Miller";
            testimonialText = "Accurate and insightful reading. Highly recommended!";
            starRating = 5;
            avatarInitials = "FM";
          },
        );
      };
      case (_) { Runtime.trap("Already seeded!") };
    };
  };

  public query ({ caller }) func getTestimonials() : async [Testimonial] {
    testimonials.values().toArray().sort();
  };
};
