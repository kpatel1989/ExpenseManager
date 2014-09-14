-- phpMyAdmin SQL Dump
-- version 4.0.4
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Aug 24, 2014 at 05:39 PM
-- Server version: 5.6.12-log
-- PHP Version: 5.4.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `expensemanager`
--
CREATE DATABASE IF NOT EXISTS `expensemanager` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `expensemanager`;

-- --------------------------------------------------------

--
-- Table structure for table `tblcategories`
--

CREATE TABLE IF NOT EXISTS `tblcategories` (
  `uCategoryId` int(3) NOT NULL,
  `strname` varchar(30) NOT NULL,
  `bMarkedAsDeleted` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`uCategoryId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `tbldailyexpense`
--

CREATE TABLE IF NOT EXISTS `tbldailyexpense` (
  `uExpenseId` int(5) NOT NULL,
  `dtExpenseDate` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `uCategoryId` int(3) NOT NULL,
  `uAmount` float(8,2) NOT NULL,
  `notes` varchar(200) NOT NULL,
  PRIMARY KEY (`uExpenseId`),
  KEY `tbldailyexpense_ibfk_1` (`uCategoryId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `tbldailyexpense`
--
ALTER TABLE `tbldailyexpense`
  ADD CONSTRAINT `tbldailyexpense_ibfk_1` FOREIGN KEY (`uCategoryId`) REFERENCES `tblcategories` (`uCategoryId`) ON DELETE NO ACTION ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
