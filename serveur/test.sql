-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : sam. 11 sep. 2021 à 00:32
-- Version du serveur : 10.4.21-MariaDB
-- Version de PHP : 8.0.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `test`
--

-- --------------------------------------------------------

--
-- Structure de la table `menu`
--

CREATE TABLE `menu` (
  `id` int(11) NOT NULL,
  `type` enum('root','menu','categorie','produit') NOT NULL,
  `parentId` int(11) NOT NULL,
  `SIRET` varchar(100) NOT NULL,
  `max` int(11) NOT NULL,
  `min` int(11) NOT NULL,
  `price` float NOT NULL,
  `currency` varchar(100) NOT NULL,
  `actif` int(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `menu`
--

INSERT INTO `menu` (`id`, `type`, `parentId`, `SIRET`, `max`, `min`, `price`, `currency`, `actif`) VALUES
(2, 'root', 0, '', 0, 0, 0, '', 0),
(3, 'menu', 2, '', 0, 0, 0, '', 0),
(4, 'categorie', 3, '', 0, 0, 0, '', 0),
(5, 'produit', 4, '', 0, 0, 0, '', 0),
(6, 'categorie', 7, '', 0, 0, 0, '', 0),
(7, 'menu', 2, '', 0, 0, 0, '', 0),
(8, 'categorie', 7, '', 0, 0, 0, '', 0);

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

CREATE TABLE `user` (
  `mail` varchar(100) NOT NULL,
  `nom` varchar(100) NOT NULL,
  `mdp` varchar(100) NOT NULL,
  `SIRET` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `menu`
--
ALTER TABLE `menu`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`mail`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `menu`
--
ALTER TABLE `menu`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
