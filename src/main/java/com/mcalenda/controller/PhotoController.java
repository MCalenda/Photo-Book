package com.mcalenda.controller;

import com.mcalenda.service.PhotoService;
import com.mcalenda.model.Photo;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;

@RestController
@CrossOrigin
@RequiredArgsConstructor
public class PhotoController {

    private final PhotoService photoService;

    @GetMapping("/")
    public String hello() {
        return "Hello World";
    }

    @GetMapping("/photo")
    public Iterable<Photo> getAllPhotos(@RequestParam(value = "page", defaultValue = "0") int page,
                                        @RequestParam(value = "size", defaultValue = "10") int size) {
        return photoService.getAllPhotos(page, size);
    }

    @GetMapping("/photo/{id}")
    public Photo get(@PathVariable Integer id) {
        Photo photo = photoService.getPhoto(id);
        if (photo == null) throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        return photo;
    }

    @DeleteMapping("/photo/{id}")
    public void delete(@PathVariable Integer id) {
        photoService.removePhoto(id);
    }

    @PostMapping("/photo")
    public Photo create(@RequestPart("data") MultipartFile file) throws IOException {
        return photoService.savePhoto(file.getOriginalFilename(), file.getContentType(), file.getBytes());
    }
}
