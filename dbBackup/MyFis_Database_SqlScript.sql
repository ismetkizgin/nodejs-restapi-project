-- phpMyAdmin SQL Dump
-- version 4.9.5deb2
-- https://www.phpmyadmin.net/
--
-- Anamakine: localhost:3306
-- Üretim Zamanı: 12 Eyl 2020, 01:46:42
-- Sunucu sürümü: 8.0.21-0ubuntu0.20.04.4
-- PHP Sürümü: 7.4.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Veritabanı: `my-fis`
--

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `tblAdminStatus`
--
DROP TABLE IF EXISTS `tblAdminStatus` ;

CREATE TABLE `tblAdminStatus` (
  `AdminStatusID` int NOT NULL,
  `AdminStatusName` varchar(20) COLLATE utf8_turkish_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_turkish_ci;

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `tblPage`
--
DROP TABLE IF EXISTS `tblPage` ;

CREATE TABLE `tblPage` (
  `PageID` int NOT NULL,
  `PageTitle` varchar(250) COLLATE utf8_turkish_ci DEFAULT NULL,
  `PageContent` text COLLATE utf8_turkish_ci,
  `PageDateTime` datetime DEFAULT NULL,
  `PagePicturePath` varchar(100) COLLATE utf8_turkish_ci DEFAULT NULL,
  `PageDescription` text COLLATE utf8_turkish_ci,
  `PageKeywords` text COLLATE utf8_turkish_ci,
  `PageStatusID` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_turkish_ci;

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `tblPageStatus`
--
DROP TABLE IF EXISTS `tblPageStatus` ;

CREATE TABLE `tblPageStatus` (
  `PageStatusID` int NOT NULL,
  `PageStatusName` varchar(30) COLLATE utf8_turkish_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_turkish_ci;

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `tblSlide`
--
DROP TABLE IF EXISTS `tblSlide` ;

CREATE TABLE `tblSlide` (
  `SlideID` int NOT NULL,
  `SlideTitle` varchar(200) COLLATE utf8_turkish_ci DEFAULT NULL,
  `SlideUrl` text COLLATE utf8_turkish_ci,
  `SlidePicPath` text COLLATE utf8_turkish_ci
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_turkish_ci;

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `tblStateAgency`
--
DROP TABLE IF EXISTS `tblStateAgency` ;

CREATE TABLE `tblStateAgency` (
  `StateAgencyID` int NOT NULL,
  `StateAgencyName` varchar(30) COLLATE utf8_turkish_ci DEFAULT NULL,
  `StateAgencyNo` bigint DEFAULT NULL,
  `StateAgencyEmail` varchar(40) COLLATE utf8_turkish_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_turkish_ci;

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `tblStateAgencyAdmin`
--
DROP TABLE IF EXISTS `tblStateAgencyAdmin` ;

CREATE TABLE `tblStateAgencyAdmin` (
  `StateAgencyAdminID` int NOT NULL,
  `StateAgencyAdminFirstName` varchar(30) COLLATE utf8_turkish_ci DEFAULT NULL,
  `StateAgencyAdminLastName` varchar(30) COLLATE utf8_turkish_ci DEFAULT NULL,
  `StateAgencyAdminIdentityNo` bigint DEFAULT NULL,
  `StateAgencyAdminEmail` varchar(40) COLLATE utf8_turkish_ci DEFAULT NULL,
  `StateAgencyAdminPassword` varchar(99) COLLATE utf8_turkish_ci DEFAULT NULL,
  `AdminStatusID` int DEFAULT NULL,
  `StateAgencyID` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_turkish_ci;

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `tblStatusAuth`
--
DROP TABLE IF EXISTS `tblStatusAuth` ;

CREATE TABLE `tblStatusAuth` (
  `StatusAuthID` int NOT NULL,
  `StatusAuthName` varchar(40) COLLATE utf8_turkish_ci DEFAULT NULL,
  `AdminStatusID` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_turkish_ci;

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `tblUser`
--
DROP TABLE IF EXISTS `tblUser` ;

CREATE TABLE `tblUser` (
  `UserID` int NOT NULL,
  `UserFirstName` varchar(30) COLLATE utf8_turkish_ci DEFAULT NULL,
  `UserLastName` varchar(20) COLLATE utf8_turkish_ci DEFAULT NULL,
  `UserIdentityNo` bigint DEFAULT NULL,
  `UserPassword` varchar(99) COLLATE utf8_turkish_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_turkish_ci;

--
-- Tablo için tablo yapısı `tblUserDetails`
--
DROP TABLE IF EXISTS `tblUserDetails` ;

CREATE TABLE `tblUserDetails` (
  `UserDetailsID` int NOT NULL,
  `UserAdressCity` varchar(15) COLLATE utf8_turkish_ci DEFAULT NULL,
  `UserAdressDistrict` varchar(25) COLLATE utf8_turkish_ci DEFAULT NULL,
  `UserAdressStreet` varchar(25) COLLATE utf8_turkish_ci DEFAULT NULL,
  `UserAdressNo` varchar(10) COLLATE utf8_turkish_ci DEFAULT NULL,
  `UserAdressApartmentName` varchar(20) COLLATE utf8_turkish_ci DEFAULT NULL,
  `UserEmail` varchar(40) COLLATE utf8_turkish_ci DEFAULT NULL,
  `UserPhone` varchar(15) COLLATE utf8_turkish_ci DEFAULT NULL,
  `UserFamilyPeopleCount` int DEFAULT NULL,
  `UserID` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_turkish_ci;


--
-- Tablo için tablo yapısı `tblUserFamily`
--
DROP TABLE IF EXISTS `tblUserFamily` ;

CREATE TABLE `tblUserFamily` (
  `UserFamilyID` int NOT NULL,
  `UserIdentityNo` bigint DEFAULT NULL,
  `UserID` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_turkish_ci;

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `tblUserLocations`
--
DROP TABLE IF EXISTS `tblUserLocations` ;

CREATE TABLE `tblUserLocations` (
  `UserLocationsID` int NOT NULL,
  `UserLocationsLat` float DEFAULT NULL,
  `UserLocationsLon` float DEFAULT NULL,
  `UserLocationsLastDate` datetime DEFAULT NULL,
  `UserID` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_turkish_ci;

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `tblUserState`
--
DROP TABLE IF EXISTS `tblUserState` ;

CREATE TABLE `tblUserState` (
  `UserStateID` int NOT NULL,
  `UserID` int DEFAULT NULL,
  `UserState` smallint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_turkish_ci;

--
-- Yordamlar
--
DELIMITER $$

-- -----------------------------------------------------
-- procedure AdminLogin
-- -----------------------------------------------------

DROP procedure IF EXISTS `AdminLogin`;

CREATE PROCEDURE `AdminLogin` (IN `AdminIdentitiyNo` BIGINT(11), IN `AdminPassword` VARCHAR(99))  BEGIN
    select SAA.StateAgencyAdminID, SAA.StateAgencyAdminIdentityNo , SAA.StateAgencyAdminFirstName, SAA.StateAgencyAdminLastName,
    AST.AdminStatusName, SA.StateAgencyName
    from tblStateAgencyAdmin SAA inner join tblAdminStatus AST  on SAA.AdminStatusID = AST.AdminStatusID
    inner join tblStateAgency SA on SAA.StateAgencyID = SA.StateAgencyID
    where SAA.StateAgencyAdminIdentityNo = AdminIdentitiyNo and SAA.StateAgencyAdminPassword = AdminPassword;
END;

-- -----------------------------------------------------
-- procedure AdminSignUp
-- -----------------------------------------------------

DROP procedure IF EXISTS `AdminSignUp`;

CREATE PROCEDURE `AdminSignUp` (IN `AdminFirstName` VARCHAR(30), IN `AdminLastName` VARCHAR(30), IN `AdminIdentityNo` BIGINT(11), IN `AdminPassword` VARCHAR(99), IN `AdminEmail` VARCHAR(40), IN `StatusName` VARCHAR(40), IN `AgencyName` VARCHAR(30))  BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        GET DIAGNOSTICS CONDITION 1
        @p2 = MESSAGE_TEXT;
        ROLLBACK;
        SIGNAL SQLSTATE '45001' SET MESSAGE_TEXT = @p2;
    END;
    START TRANSACTION;
		INSERT INTO tblStateAgencyAdmin (StateAgencyAdminFirstName,StateAgencyAdminLastName,StateAgencyAdminIdentityNo,
		                                 StateAgencyAdminEmail,StateAgencyAdminPassword,AdminStatusID,StateAgencyID)
		VALUES (AdminFirstName,AdminLastName,AdminIdentityNo,
		        AdminEmail,AdminPassword,
		        (Select AdminStatusID from tblAdminStatus where AdminStatusName=StatusName),
		        (Select StateAgencyID from tblStateAgency where StateAgencyName=AgencyName));
    (Select StateAgencyAdminID FROM tblStateAgencyAdmin ORDER BY StateAgencyAdminID DESC LIMIT 1);    
	COMMIT;
END;

-- -----------------------------------------------------
-- procedure UserLogin
-- -----------------------------------------------------

DROP procedure IF EXISTS `UserLogin`;

CREATE PROCEDURE `UserLogin` (IN `UserIdentityNo` BIGINT(11), IN `UserPassword` VARCHAR(99))  BEGIN
    select U.UserID,U.UserIdentityNo,U.UserFirstName,U.UserLastName ,UD.UserAdressCity,UD.UserAdressDistrict,
    UD.UserAdressStreet ,UD.UserAdressNo ,UD.UserAdressApartmentName, UD.UserEmail ,UD.UserPhone , UD.UserFamilyPeopleCount
    from tblUser U inner join tblUserDetails UD on U.UserID=UD.UserID
    where U.UserIdentityNo = UserIdentityNo and U.UserPassword = UserPassword;
END;

-- -----------------------------------------------------
-- procedure UserSignUp
-- -----------------------------------------------------

DROP procedure IF EXISTS `UserSignUp`;

CREATE PROCEDURE `UserSignUp` (IN `User_FirstName` VARCHAR(30), IN `User_LastName` VARCHAR(20), IN `User_IdentityNo` BIGINT(11), IN `User_Password` VARCHAR(99), IN `User_City` VARCHAR(15), IN `User_District` VARCHAR(25), IN `User_Street` VARCHAR(25), IN `User_No` VARCHAR(10), IN `User_ApartmentName` VARCHAR(20), IN `User_Email` VARCHAR(40), IN `User_Phone` VARCHAR(15), IN `User_FamilyPeopleCount` INT)  BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        GET DIAGNOSTICS CONDITION 1
        @p2 = MESSAGE_TEXT;
        ROLLBACK;
        SIGNAL SQLSTATE '45001' SET MESSAGE_TEXT = @p2;
    END;
    START TRANSACTION;
		INSERT INTO tblUser (UserFirstName,UserLastName,UserIdentityNo,UserPassword) VALUES ( User_FirstName,User_LastName,User_IdentityNo,User_Password);
		INSERT INTO tblUserDetails (UserAdressCity,UserAdressDistrict,UserAdressStreet,UserAdressNo,UserAdressApartmentName,UserEmail,UserPhone,UserFamilyPeopleCount,UserID)
		VALUES (User_City,User_District,User_Street,User_No,User_ApartmentName,User_Email,User_Phone,User_FamilyPeopleCount,
		        (Select UserID FROM tblUser ORDER BY UserID DESC LIMIT 1));    
    (Select UserID FROM tblUser ORDER BY UserID DESC LIMIT 1);
	COMMIT;
END;
DELIMITER ;


--
-- Tablo için indeksler `tblAdminStatus`
--
ALTER TABLE `tblAdminStatus`
  ADD PRIMARY KEY (`AdminStatusID`);

--
-- Tablo için indeksler `tblPage`
--
ALTER TABLE `tblPage`
  ADD PRIMARY KEY (`PageID`),
  ADD UNIQUE KEY `PageStatusID` (`PageStatusID`);

--
-- Tablo için indeksler `tblPageStatus`
--
ALTER TABLE `tblPageStatus`
  ADD PRIMARY KEY (`PageStatusID`);

--
-- Tablo için indeksler `tblSlide`
--
ALTER TABLE `tblSlide`
  ADD PRIMARY KEY (`SlideID`);

--
-- Tablo için indeksler `tblStateAgency`
--
ALTER TABLE `tblStateAgency`
  ADD PRIMARY KEY (`StateAgencyID`);

--
-- Tablo için indeksler `tblStateAgencyAdmin`
--
ALTER TABLE `tblStateAgencyAdmin`
  ADD PRIMARY KEY (`StateAgencyAdminID`),
  ADD UNIQUE KEY `AdminStatusID` (`AdminStatusID`),
  ADD UNIQUE KEY `StateAgencyID` (`StateAgencyID`);

--
-- Tablo için indeksler `tblStatusAuth`
--
ALTER TABLE `tblStatusAuth`
  ADD PRIMARY KEY (`StatusAuthID`),
  ADD UNIQUE KEY `AdminStatusID` (`AdminStatusID`);

--
-- Tablo için indeksler `tblUser`
--
ALTER TABLE `tblUser`
  ADD PRIMARY KEY (`UserID`),
  ADD UNIQUE KEY `UserIdentityNo` (`UserIdentityNo`);

--
-- Tablo için indeksler `tblUserDetails`
--
ALTER TABLE `tblUserDetails`
  ADD PRIMARY KEY (`UserDetailsID`),
  ADD UNIQUE KEY `UserID` (`UserID`);

--
-- Tablo için indeksler `tblUserFamily`
--
ALTER TABLE `tblUserFamily`
  ADD PRIMARY KEY (`UserFamilyID`),
  ADD UNIQUE KEY `UserID` (`UserID`);

--
-- Tablo için indeksler `tblUserLocations`
--
ALTER TABLE `tblUserLocations`
  ADD PRIMARY KEY (`UserLocationsID`),
  ADD UNIQUE KEY `UserID` (`UserID`);

--
-- Tablo için indeksler `tblUserState`
--
ALTER TABLE `tblUserState`
  ADD PRIMARY KEY (`UserStateID`),
  ADD UNIQUE KEY `UserID` (`UserID`);

--
-- Dökümü yapılmış tablolar için AUTO_INCREMENT değeri
--

--
-- Tablo için AUTO_INCREMENT değeri `tblAdminStatus`
--
ALTER TABLE `tblAdminStatus`
  MODIFY `AdminStatusID` int NOT NULL AUTO_INCREMENT;

--
-- Tablo için AUTO_INCREMENT değeri `tblPage`
--
ALTER TABLE `tblPage`
  MODIFY `PageID` int NOT NULL AUTO_INCREMENT;

--
-- Tablo için AUTO_INCREMENT değeri `tblPageStatus`
--
ALTER TABLE `tblPageStatus`
  MODIFY `PageStatusID` int NOT NULL AUTO_INCREMENT;

--
-- Tablo için AUTO_INCREMENT değeri `tblSlide`
--
ALTER TABLE `tblSlide`
  MODIFY `SlideID` int NOT NULL AUTO_INCREMENT;

--
-- Tablo için AUTO_INCREMENT değeri `tblStateAgency`
--
ALTER TABLE `tblStateAgency`
  MODIFY `StateAgencyID` int NOT NULL AUTO_INCREMENT;

--
-- Tablo için AUTO_INCREMENT değeri `tblStateAgencyAdmin`
--
ALTER TABLE `tblStateAgencyAdmin`
  MODIFY `StateAgencyAdminID` int NOT NULL AUTO_INCREMENT;

--
-- Tablo için AUTO_INCREMENT değeri `tblStatusAuth`
--
ALTER TABLE `tblStatusAuth`
  MODIFY `StatusAuthID` int NOT NULL AUTO_INCREMENT;

--
-- Tablo için AUTO_INCREMENT değeri `tblUser`
--
ALTER TABLE `tblUser`
  MODIFY `UserID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- Tablo için AUTO_INCREMENT değeri `tblUserDetails`
--
ALTER TABLE `tblUserDetails`
  MODIFY `UserDetailsID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- Tablo için AUTO_INCREMENT değeri `tblUserFamily`
--
ALTER TABLE `tblUserFamily`
  MODIFY `UserFamilyID` int NOT NULL AUTO_INCREMENT;

--
-- Tablo için AUTO_INCREMENT değeri `tblUserLocations`
--
ALTER TABLE `tblUserLocations`
  MODIFY `UserLocationsID` int NOT NULL AUTO_INCREMENT;

--
-- Tablo için AUTO_INCREMENT değeri `tblUserState`
--
ALTER TABLE `tblUserState`
  MODIFY `UserStateID` int NOT NULL AUTO_INCREMENT;

--
-- Dökümü yapılmış tablolar için kısıtlamalar
--

--
-- Tablo kısıtlamaları `tblPage`
--
ALTER TABLE `tblPage`
  ADD CONSTRAINT `tblPage_ibfk_1` FOREIGN KEY (`PageStatusID`) REFERENCES `tblPageStatus` (`PageStatusID`) ON DELETE CASCADE;

--
-- Tablo kısıtlamaları `tblStateAgencyAdmin`
--
ALTER TABLE `tblStateAgencyAdmin`
  ADD CONSTRAINT `tblStateAgencyAdmin_ibfk_1` FOREIGN KEY (`StateAgencyID`) REFERENCES `tblStateAgency` (`StateAgencyID`) ON DELETE CASCADE,
  ADD CONSTRAINT `tblStateAgencyAdmin_ibfk_2` FOREIGN KEY (`AdminStatusID`) REFERENCES `tblAdminStatus` (`AdminStatusID`) ON DELETE CASCADE;

--
-- Tablo kısıtlamaları `tblStatusAuth`
--
ALTER TABLE `tblStatusAuth`
  ADD CONSTRAINT `tblStatusAuth_ibfk_1` FOREIGN KEY (`AdminStatusID`) REFERENCES `tblAdminStatus` (`AdminStatusID`) ON DELETE CASCADE;

--
-- Tablo kısıtlamaları `tblUserDetails`
--
ALTER TABLE `tblUserDetails`
  ADD CONSTRAINT `tblUserDetails_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `tblUser` (`UserID`) ON DELETE CASCADE;

--
-- Tablo kısıtlamaları `tblUserFamily`
--
ALTER TABLE `tblUserFamily`
  ADD CONSTRAINT `tblUserFamily_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `tblUser` (`UserID`) ON DELETE CASCADE;

--
-- Tablo kısıtlamaları `tblUserLocations`
--
ALTER TABLE `tblUserLocations`
  ADD CONSTRAINT `tblUserLocations_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `tblUser` (`UserID`) ON DELETE CASCADE;

--
-- Tablo kısıtlamaları `tblUserState`
--
ALTER TABLE `tblUserState`
  ADD CONSTRAINT `tblUserState_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `tblUser` (`UserID`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;