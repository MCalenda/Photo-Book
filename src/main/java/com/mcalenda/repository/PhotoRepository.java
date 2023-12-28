package com.mcalenda.repository;

import com.mcalenda.model.Photo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

public interface PhotoRepository extends JpaRepository<Photo, Integer> {
}