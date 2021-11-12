-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : ven. 12 nov. 2021 à 02:03
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
-- Structure de la table `client`
--

CREATE TABLE `client` (
  `id` int(11) NOT NULL,
  `mail` text NOT NULL,
  `password` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `commande`
--

CREATE TABLE `commande` (
  `id` int(11) NOT NULL,
  `idrest` varchar(100) NOT NULL,
  `state` int(100) NOT NULL DEFAULT 0,
  `string` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `commande`
--

INSERT INTO `commande` (`id`, `idrest`, `state`, `string`) VALUES
(1, 'e@e.fr', -1, 'vale 1'),
(2, 'e@e.fr', 1, 'vale2'),
(3, 'e@e.fr', 3, 'vale3');

-- --------------------------------------------------------

--
-- Structure de la table `menu`
--

CREATE TABLE `menu` (
  `id` int(11) NOT NULL,
  `type` enum('root','menu','categorie','produit') NOT NULL,
  `parentId` int(11) NOT NULL,
  `mail` varchar(100) NOT NULL,
  `name` varchar(100) NOT NULL,
  `max` int(11) NOT NULL,
  `min` int(11) NOT NULL,
  `price` float NOT NULL,
  `currency` varchar(100) NOT NULL,
  `actif` int(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `menu`
--

INSERT INTO `menu` (`id`, `type`, `parentId`, `mail`, `name`, `max`, `min`, `price`, `currency`, `actif`) VALUES
(2, 'root', 0, 'e@e.fr', 'cafe', 1, 0, 0, '', 1),
(3, 'menu', 2, 'e@e.fr', 'kebab', 1, 0, 0, '', 1),
(4, 'categorie', 3, 'e@e.fr', 'viande', 1, 0, 0, '', 1),
(5, 'produit', 4, 'e@e.fr', 'poulet', 1, 0, 0, '', 1),
(6, 'categorie', 7, 'e@e.fr', 'pepsi', 1, 0, 0, '', 1),
(7, 'menu', 2, 'e@e.fr', 'boisson', 1, 0, 0, '', 1),
(8, 'categorie', 7, 'e@e.fr', 'coca', 1, 0, 0, '', 1);

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

CREATE TABLE `user` (
  `mail` varchar(100) NOT NULL,
  `nom` varchar(100) NOT NULL,
  `mdp` varchar(200) NOT NULL,
  `SIRET` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `user`
--

INSERT INTO `user` (`mail`, `nom`, `mdp`, `SIRET`) VALUES
('a@a.fr', 'aa', 'Isabelle101067*', '11'),
('b@b.fr', 'KHALFALLAH', 'Isabelle101067*', '11'),
('c@c.fr', 'KHALFALLAH', '7c72a9ac1640ea6fccaac3c738fcc2eb9d198d2a364e1c99f59d42d5345f70607833ee86529a076e2b89aa12d067f4547ecf', '11'),
('d@d.fr', 'aa', '7c72a9ac1640ea6fccaac3c738fcc2eb9d198d2a364e1c99f59d42d5345f70607833ee86529a076e2b89aa12d067f4547ecf', '11'),
('e@e.fr', 'aa', '7c72a9ac1640ea6fccaac3c738fcc2eb9d198d2a364e1c99f59d42d5345f70607833ee86529a076e2b89aa12d067f4547ecfe5ffc622001d25f85e17a8f67aaf', '11'),
('f@f.fr', 'KHALFALLAH', '7c72a9ac1640ea6fccaac3c738fcc2eb9d198d2a364e1c99f59d42d5345f70607833ee86529a076e2b89aa12d067f4547ecfe5ffc622001d25f85e17a8f67aaf', '11');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `client`
--
ALTER TABLE `client`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `commande`
--
ALTER TABLE `commande`
  ADD PRIMARY KEY (`id`);

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
-- AUTO_INCREMENT pour la table `client`
--
ALTER TABLE `client`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `commande`
--
ALTER TABLE `commande`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `menu`
--
ALTER TABLE `menu`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
