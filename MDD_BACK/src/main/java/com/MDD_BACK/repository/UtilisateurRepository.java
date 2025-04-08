package com.MDD_BACK.repository;

import com.MDD_BACK.entity.Utilisateur;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface UtilisateurRepository extends JpaRepository<Utilisateur, Long> {
    Utilisateur findByEmail(String email);

    @Query("SELECT u FROM Utilisateur u WHERE u.username = :identifier OR u.email = :identifier")
    Utilisateur findByUsernameOrEmail(@Param("identifier") String identifier);
}
