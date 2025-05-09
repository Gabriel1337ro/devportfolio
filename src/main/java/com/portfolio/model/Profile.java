package com.portfolio.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "profile")
public class Profile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombre;
    private String titulo;
    @Column(length = 1000)
    private String descripcion;
    private String fotoPerfilUrl;
    private String ubicacion;
    private String correo;
    private String githubUrl;
    private String linkedinUrl;
    private String cvInglesUrl;
    private String cvEspanolUrl;
    private String idiomas;
} 