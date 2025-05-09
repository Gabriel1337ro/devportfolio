package com.portfolio.controller;

import com.portfolio.model.Profile;
import com.portfolio.repository.ProfileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/profile")
@CrossOrigin
public class ProfileController {

    @Autowired
    private ProfileRepository profileRepository;

    @GetMapping
    public ResponseEntity<Profile> getProfile() {
        Optional<Profile> profile = profileRepository.findById(1L);
        return profile.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping
    public ResponseEntity<Profile> updateProfile(@RequestBody Profile updatedProfile) {
        updatedProfile.setId(1L);
        Profile saved = profileRepository.save(updatedProfile);
        return ResponseEntity.ok(saved);
    }
} 