package com.MDD_BACK.service;

import com.MDD_BACK.entity.Utilisateur;
import com.MDD_BACK.repository.UtilisateurRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private UtilisateurRepository utilisateurRepository;

    public String login(String identifier, String password) {
        Utilisateur utilisateur = utilisateurRepository.findByUsernameOrEmail(identifier);

        if (utilisateur == null) {
            throw new IllegalArgumentException("Utilisateur non trouvé !");
        }

        if (!utilisateur.getPassword().equals(password)) {
            throw new IllegalArgumentException("Mot de passe incorrect !");
        }

        return utilisateur.getRole();
    }
}
