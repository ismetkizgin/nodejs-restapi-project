-- phpMyAdmin SQL Dump
-- version 4.9.5deb2
-- https://www.phpmyadmin.net/
--
-- Anamakine: localhost:3306
-- Üretim Zamanı: 12 Eyl 2020, 02:14:00
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

DELIMITER $$
--
-- Yordamlar
--
CREATE PROCEDURE `InstitutionUserLogin` (IN `AdminIdentitiyNo` BIGINT(11), IN `AdminPassword` VARCHAR(99))  BEGIN
    select SAA.InstitutionUserID, SAA.InstitutionUserIdentityNo , SAA.InstitutionUserFirstName, SAA.InstitutionUserLastName,
    AST.InstitutionUserStatusName, SA.InstitutionName
    from tblInstitutionUser SAA inner join tblInstitutionUserStatus AST  on SAA.InstitutionUserStatusID = AST.InstitutionUserStatusID
    inner join tblInstitution SA on SAA.InstitutionID = SA.InstitutionID
    where SAA.InstitutionUserIdentityNo = AdminIdentitiyNo and SAA.InstitutionUserPassword = AdminPassword;
END$$

CREATE PROCEDURE `InstitutionUserSignUp` (IN `AdminFirstName` VARCHAR(30), IN `AdminLastName` VARCHAR(30), IN `AdminIdentityNo` BIGINT(11), IN `AdminPassword` VARCHAR(99), IN `AdminEmail` VARCHAR(40), IN `StatusName` VARCHAR(40), IN `AgencyName` VARCHAR(30))  BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        GET DIAGNOSTICS CONDITION 1
        @p2 = MESSAGE_TEXT;
        ROLLBACK;
        SIGNAL SQLSTATE '45001' SET MESSAGE_TEXT = @p2;
    END;
    START TRANSACTION;
		INSERT INTO tblInstitutionUser (InstitutionUserFirstName,InstitutionUserLastName,InstitutionUserIdentityNo,
		                                 InstitutionUserEmail,InstitutionUserPassword,InstitutionUserStatusID,InstitutionID)
		VALUES (AdminFirstName,AdminLastName,AdminIdentityNo,
		        AdminEmail,AdminPassword,
		        (Select InstitutionUserStatusID from tblInstitutionUserStatus where InstitutionUserStatusName=StatusName),
		        (Select InstitutionID from tblInstitution where InstitutionName=AgencyName));
    (Select InstitutionUserID FROM tblInstitutionUser ORDER BY InstitutionUserID DESC LIMIT 1);    
	COMMIT;
END$$

CREATE PROCEDURE `UserLogin` (IN `UserIdentityNo` BIGINT(11), IN `UserPassword` VARCHAR(99))  BEGIN
    select U.UserID,U.UserIdentityNo,U.UserFirstName,U.UserLastName ,UD.UserAdressCity,UD.UserAdressDistrict,
    UD.UserAdressStreet ,UD.UserAdressNo ,UD.UserAdressApartmentName, UD.UserEmail ,UD.UserPhone , UD.UserFamilyPeopleCount
    from tblUser U inner join tblUserDetails UD on U.UserID=UD.UserID
    where U.UserIdentityNo = UserIdentityNo and U.UserPassword = UserPassword;
END$$

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
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `tblInstitutionUserStatus`
--

CREATE TABLE `tblInstitutionUserStatus` (
  `InstitutionUserStatusName` varchar(20) COLLATE utf8_turkish_ci DEFAULT NULL,
  `InstitutionUserStatusNumber` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_turkish_ci;

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `tblPage`
--

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

CREATE TABLE `tblPageStatus` (
  `PageStatusID` int NOT NULL,
  `PageStatusName` varchar(30) COLLATE utf8_turkish_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_turkish_ci;

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `tblSlide`
--

CREATE TABLE `tblSlide` (
  `SlideID` int NOT NULL,
  `SlideTitle` varchar(200) COLLATE utf8_turkish_ci DEFAULT NULL,
  `SlideUrl` text COLLATE utf8_turkish_ci,
  `SlidePicPath` text COLLATE utf8_turkish_ci
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_turkish_ci;

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `tblInstitution`
--

CREATE TABLE `tblInstitution` (
  `InstitutionID` int NOT NULL,
  `InstitutionName` varchar(30) COLLATE utf8_turkish_ci DEFAULT NULL,
  `InstitutionPhone` varchar(11) DEFAULT NULL,
  `InstitutionEmail` varchar(40) COLLATE utf8_turkish_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_turkish_ci;

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `tblInstitutionUser`
--

CREATE TABLE `tblInstitutionUser` (
  `InstitutionUserID` int NOT NULL,
  `InstitutionUserFirstName` varchar(30) COLLATE utf8_turkish_ci DEFAULT NULL,
  `InstitutionUserLastName` varchar(30) COLLATE utf8_turkish_ci DEFAULT NULL,
  `InstitutionUserIdentityNo` bigint DEFAULT NULL,
  `InstitutionUserEmail` varchar(40) COLLATE utf8_turkish_ci DEFAULT NULL,
  `InstitutionUserPassword` varchar(99) COLLATE utf8_turkish_ci DEFAULT NULL,
  `InstitutionUserStatusName` varchar(20) COLLATE utf8_turkish_ci DEFAULT NULL,
  `InstitutionID` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_turkish_ci;

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `tblUser`
--

CREATE TABLE `tblUser` (
  `UserID` int NOT NULL,
  `UserFirstName` varchar(30) COLLATE utf8_turkish_ci DEFAULT NULL,
  `UserLastName` varchar(20) COLLATE utf8_turkish_ci DEFAULT NULL,
  `UserIdentityNo` bigint DEFAULT NULL,
  `UserPassword` varchar(99) COLLATE utf8_turkish_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_turkish_ci;

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `tblUserDetails`
--

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

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `tblUserFamily`
--

CREATE TABLE `tblUserFamily` (
  `UserFamilyID` int NOT NULL,
  `UserIdentityNo` bigint DEFAULT NULL,
  `UserID` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_turkish_ci;

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `tblUserLocations`
--

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

CREATE TABLE `tblUserState` (
  `UserStateID` int NOT NULL,
  `UserID` int DEFAULT NULL,
  `UserState` smallint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_turkish_ci;

--
-- Dökümü yapılmış tablolar için indeksler
--

--
-- Tablo için indeksler `tblInstitutionUserStatus`
--
ALTER TABLE `tblInstitutionUserStatus`
  ADD PRIMARY KEY (`InstitutionUserStatusName`);

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
-- Tablo için indeksler `tblInstitution`
--
ALTER TABLE `tblInstitution`
  ADD PRIMARY KEY (`InstitutionID`);

--
-- Tablo için indeksler `tblInstitutionUser`
--
ALTER TABLE `tblInstitutionUser`
  ADD PRIMARY KEY (`InstitutionUserID`),
  ADD UNIQUE KEY `InstitutionUserStatusID` (`InstitutionUserStatusID`),
  ADD UNIQUE KEY `InstitutionID` (`InstitutionID`);

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
-- Tablo için AUTO_INCREMENT değeri `tblInstitutionUserStatus`
--
ALTER TABLE `tblInstitutionUserStatus`
  MODIFY `InstitutionUserStatusID` int NOT NULL AUTO_INCREMENT;

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
-- Tablo için AUTO_INCREMENT değeri `tblInstitution`
--
ALTER TABLE `tblInstitution`
  MODIFY `InstitutionID` int NOT NULL AUTO_INCREMENT;

--
-- Tablo için AUTO_INCREMENT değeri `tblInstitutionUser`
--
ALTER TABLE `tblInstitutionUser`
  MODIFY `InstitutionUserID` int NOT NULL AUTO_INCREMENT;

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
-- Tablo kısıtlamaları `tblInstitutionUser`
--
ALTER TABLE `tblInstitutionUser`
  ADD CONSTRAINT `tblInstitutionUser_ibfk_1` FOREIGN KEY (`InstitutionID`) REFERENCES `tblInstitution` (`InstitutionID`) ON DELETE CASCADE,
  ADD CONSTRAINT `tblInstitutionUser_ibfk_2` FOREIGN KEY (`InstitutionUserStatusID`) REFERENCES `tblInstitutionUserStatus` (`InstitutionUserStatusID`) ON DELETE CASCADE;

--
-- Tablo kısıtlamaları `tblStatusAuth`
--
ALTER TABLE `tblStatusAuth`
  ADD CONSTRAINT `tblStatusAuth_ibfk_1` FOREIGN KEY (`InstitutionUserStatusID`) REFERENCES `tblInstitutionUserStatus` (`InstitutionUserStatusID`) ON DELETE CASCADE;

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