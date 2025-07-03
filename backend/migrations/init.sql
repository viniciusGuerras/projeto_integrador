CREATE TABLE "User" (
    "Registration" varchar NOT NULL,
    "Password" varchar NOT NULL,
    "CPF" varchar NOT NULL,
    "Name" varchar NOT NULL,
    "Phone" varchar NOT NULL,
    "Email" varchar NOT NULL,
    "BirthDate" date NOT NULL,
    "Type" varchar NOT NULL,
    CONSTRAINT "pk_User" PRIMARY KEY (
        "Registration"
    )
);

CREATE TABLE "Room" (
    "Number" int NOT NULL,
    "Description" varchar NOT NULL,
    "Availability" varchar NOT NULL,
    "ChairQty" int NOT NULL,
    CONSTRAINT "pk_Room" PRIMARY KEY (
        "Number"
    )
);

CREATE TABLE "Material" (
    "Number" int NOT NULL,
    "RoomNumber" int NULL,
    "ReservedQty" int NULL,
    "Availability" varchar NOT NULL,
    "Quantity" int NOT NULL,
    "Name" varchar NOT NULL,
    "Description" varchar NOT NULL,
    "Condition" varchar NOT NULL,
    "PurchaseDate" date NOT NULL,
    "Type" varchar NOT NULL,
    CONSTRAINT "pk_Material" PRIMARY KEY (
        "Number"
    )
);

CREATE TABLE "ClassSchedule" (
    "UserId" varchar NOT NULL,
    "ClassHour" int NOT NULL,
    "RoomNumber" int NULL,
    "ReturnDate" date NULL,
    "ClassGroup" varchar NOT NULL,
    "Subject" varchar NOT NULL,
    "ClassQty" int NOT NULL,
    CONSTRAINT "pk_ClassSchedule" PRIMARY KEY (
        "UserId", "ClassHour"
    )
);

CREATE TABLE "MaterialReservation" (
    "ClassHour" int NOT NULL,
    "MaterialId" int NOT NULL,
    "ReturnDate" date NOT NULL,
    CONSTRAINT "pk_MaterialReservation" PRIMARY KEY (
        "ClassHour", "MaterialId"
    )
);

ALTER TABLE "Material" ADD CONSTRAINT "fk_Material_RoomNumber" FOREIGN KEY("RoomNumber")
REFERENCES "Room" ("Number");

ALTER TABLE "ClassSchedule" ADD CONSTRAINT "fk_ClassSchedule_UserId" FOREIGN KEY("UserId")
REFERENCES "User" ("Registration");

ALTER TABLE "ClassSchedule" ADD CONSTRAINT "fk_ClassSchedule_RoomNumber" FOREIGN KEY("RoomNumber")
REFERENCES "Room" ("Number");

ALTER TABLE "MaterialReservation" ADD CONSTRAINT "fk_MaterialReservation_ClassHour" FOREIGN KEY("ClassHour")
REFERENCES "ClassSchedule" ("ClassHour");

ALTER TABLE "MaterialReservation" ADD CONSTRAINT "fk_MaterialReservation_MaterialId" FOREIGN KEY("Mat
