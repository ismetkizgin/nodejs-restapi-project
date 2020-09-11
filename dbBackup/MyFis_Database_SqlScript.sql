-- phpMyAdmin SQL Dump
-- version 4.9.5deb2
-- https://www.phpmyadmin.net/
--
-- Anamakine: localhost:3306
-- Üretim Zamanı: 12 Eyl 2020, 01:02:37
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

CREATE TABLE `tblAdminStatus` (
  `AdminStatusID` int NOT NULL,
  `AdminStatusName` varchar(20) COLLATE utf8_turkish_ci DEFAULT NULL
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
-- Tablo için tablo yapısı `tblStateAgency`
--

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

CREATE TABLE `tblStatusAuth` (
  `StatusAuthID` int NOT NULL,
  `StatusAuthName` varchar(40) COLLATE utf8_turkish_ci DEFAULT NULL,
  `AdminStatusID` int DEFAULT NULL
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
  MODIFY `UserID` int NOT NULL AUTO_INCREMENT;

--
-- Tablo için AUTO_INCREMENT değeri `tblUserDetails`
--
ALTER TABLE `tblUserDetails`
  MODIFY `UserDetailsID` int NOT NULL AUTO_INCREMENT;

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