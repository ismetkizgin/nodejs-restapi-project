/* User Data */
CALL UserSignUp("İsmet", "KİZGİN", 12345678912, "password","İstanbul", "Kadıköy", "Mustafa Kemal CD.", 142,"Gonca Aprt.","izmetkizgin@gmail.com","(554)55512312",5,1)
INSERT INTO tblUserState (UserID,UserState) VALUES (1, 2);

CALL UserSignUp("Yusuf", "DEDE", 12345678932, "password","Bursa", "Merkez", "İnönü CD.", 102," Papatya Aprt.","yusufdede@gmail.com","(554)44412312",3,2)
INSERT INTO tblUserState (UserID,UserState) VALUES (2, 2);

CALL UserSignUp("Mehmet Ayberk", "ÇAKAR", 12345678942, "password","İzmir", "Dikili", "Cumhuriyet CD.", 8,"Deniz Aprt.","ayberkcakar@gmail.com","(554)33333312",4,3)
INSERT INTO tblUserState (UserID,UserState) VALUES (2, 2);

/* User Family Data */

INSERT INTO tblUserFamily (UserIdentityNo,UserID) VALUES (12345678932, 1);
INSERT INTO tblUserFamily (UserIdentityNo,UserID) VALUES (12345678942, 1);
INSERT INTO tblUserFamily (UserIdentityNo,UserID) VALUES (12345678912, 2);
INSERT INTO tblUserFamily (UserIdentityNo,UserID) VALUES (12345678942, 2);
INSERT INTO tblUserFamily (UserIdentityNo,UserID) VALUES (12345678912, 3);
INSERT INTO tblUserFamily (UserIdentityNo,UserID) VALUES (12345678932, 3);

/* User Locations Data */

INSERT INTO tblUserLocations (UserLocationsLat,UserLocationsLon,UserLocationsLastDate,UserID) VALUES (38.5002, 27.7084 ,'2020-06-30 12:32:59' ,1);
INSERT INTO tblUserLocations (UserLocationsLat,UserLocationsLon,UserLocationsLastDate,UserID) VALUES (50.5002, 22.7084 ,'2020-07-03 18:02:59' ,1);
INSERT INTO tblUserLocations (UserLocationsLat,UserLocationsLon,UserLocationsLastDate,UserID) VALUES (36.5002, 25.7084 ,'2020-07-04 22:46:59' ,1);

/* Slide Data */

INSERT INTO tblSlide (SlideTitle,SlideUrl,SlidePicPath) VALUES ("Elazığ ve Malatya’da İyileştirme Çalışmaları Devam Ediyor","https://www.afad.gov.tr/kurumlar/afad.gov.tr/Promo/2020/elazig_deprem_6_8_01.jpg?mode=resize&width=1920","https://www.afad.gov.tr/elazig-ve-malatyada-iyilestirme-calismalari-devam-ediyorkampanya");
INSERT INTO tblSlide (SlideTitle,SlideUrl,SlidePicPath) VALUES ("Yangın Tedbirlerini Al ki Canın Sağ Olsun!","https://www.afad.gov.tr/kurumlar/afad.gov.tr/Promo/caninsagolsun.jpeg?mode=resize&width=1920","https://www.afad.gov.tr/yangin-tedbirlerini-al-ki-canin-sag-olsun");
INSERT INTO tblSlide (SlideTitle,SlideUrl,SlidePicPath) VALUES ("Anneler Günü'nde Asırlık Çınarlar Unutulmadı","https://www.afad.gov.tr/kurumlar/Merkez/Promo/annelergunu3.jpg?mode=resize&width=1920","https://www.afad.gov.tr/anneler-gununde-asirlik-cinarlarr-unutulmadi-merkezicerik");

/* PageStatus Data */

INSERT INTO tblPageStatus (PageStatusName) VALUES ("News");
INSERT INTO tblPageStatus (PageStatusName) VALUES ("Rescue Work");


/* AdminStatus Data */

INSERT INTO tblInstitutionUserStatus (InstitutionUserStatusName) VALUES ("MyFis Admin");
INSERT INTO tblInstitutionUserStatus (InstitutionUserStatusName) VALUES ("AKUT Admin");
INSERT INTO tblInstitutionUserStatus (InstitutionUserStatusName) VALUES ("İtfaye Admin");

/* StatusAuth Data */

INSERT INTO tblStatusAuth (StatusAuthName,InstitutionUserStatusID) VALUES ("Kurum Bilgisi İnceleme",1);
INSERT INTO tblStatusAuth (StatusAuthName,InstitutionUserStatusID) VALUES ("Tam Yetkili Admin Ekleme",1);
INSERT INTO tblStatusAuth (StatusAuthName,InstitutionUserStatusID) VALUES ("Kurum Lideri Ekleme",2);

/* StateAgency Data */

INSERT INTO tblInstitution (InstitutionName,InstitutionNo,InstitutionEmail) VALUES ("MyFis",1111111111,"myfis@gmail.com");
INSERT INTO tblInstitution (InstitutionName,InstitutionNo,InstitutionEmail) VALUES ("AKUT",2222222222,"akut@gmail.com");
INSERT INTO tblInstitution (InstitutionName,InstitutionNo,InstitutionEmail) VALUES ("İTFAYE",3333333333,"itfaye@gmail.com");

/* StateAgencyAdmin Data */

CALL InstitutionUserSignUp("Elif Yaren","TAT",12345678954,"elif@gmail.com","password",1,1);
CALL InstitutionUserSignUp("Kadircan","KARADEMİR",12345678964,"kadircan@gmail.com","password",2,2);

