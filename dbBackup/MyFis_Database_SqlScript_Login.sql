-- -----------------------------------------------------
-- function drop AdminLogin and UserLogin
-- -----------------------------------------------------

DROP function IF EXISTS `AdminLogin`;
DROP function IF EXISTS `UserLogin`;

-- -----------------------------------------------------
-- procedure UserLogin
-- -----------------------------------------------------

USE `My-Fis`;
DROP procedure IF EXISTS `UserLogin`;
SHOW WARNINGS;

DELIMITER $$
USE `My-Fis`$$
CREATE PROCEDURE `UserLogin` ( IN UserIdentitiyNo INT, IN UserPassword INT  ) 
BEGIN
    select U.UserID,U.UserIdentity,U.UserFirstName,U.UserLastName ,UD.UserAdressCity,UD.UserAdressDistrict,
    UD.UserAdressStreet ,UD.UserAdressNo ,UD.UserAdressApartmentName, UD.UserEmail ,UD.UserPhone , UD.UserFamilyPeopleCount
    from tblUser U inner join tblUserDetails UD on U.UserID=UD.UserID 
    where U.UserIdentityNo = UserIdentityNo and U.UserPassword = UserPassword;
END;$$

DELIMITER ;
SHOW WARNINGS;

-- -----------------------------------------------------
-- procedure AdminLogin
-- -----------------------------------------------------

USE `My-Fis`;
DROP procedure IF EXISTS `AdminLogin`;
SHOW WARNINGS;

DELIMITER $$
USE `My-Fis`$$
CREATE PROCEDURE `AdminLogin` ( IN AdminIdentitiyNo INT,   IN AdminPassword INT  ) 
BEGIN
    select SAA.StateAgencyAdminID, SAA.StateAgencyAdminIdentityNo , SAA.StateAgencyAdminFirstName, SAA.StateAgencyAdminLastName,
    AST.AdminStatusName, SA.StateAgencyName
    from tblStateAgencyAdmin SAA inner join tblAdminStatus AST  on SAA. StateAgencyAdminID = AST.StateAgencyAdminID 
    inner join tblStateAgency SA on SAA.StateAgencyAdminID = SA.StateAgencyAdminID
    where AdminIdentitiyNo = AdminIdentitiyNo and AdminPassword = AdminPassword;
END;$$

DELIMITER ;
SHOW WARNINGS;
