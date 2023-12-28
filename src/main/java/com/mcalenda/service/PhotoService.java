package com.mcalenda.service;

import com.mcalenda.model.Photo;
import com.mcalenda.repository.PhotoRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Transactional(rollbackOn = Exception.class)
public class PhotoService {

    private final PhotoRepository photoRepository;

    public Page<Photo> getAllPhotos(int page, int size) {
        return photoRepository.findAll(PageRequest.of(page, size, Sort.by("fileName")));
    }

    public Photo getPhoto(Integer id) {
        return photoRepository.findById(id).orElse(null);
    }

    public void removePhoto(Integer id) {
        photoRepository.deleteById(id);
    }

    public Photo savePhoto(String fileName, String contentType, byte[] data) {
        Photo photo = new Photo();
        photo.setContentType(contentType);
        photo.setFileName(fileName);
        photo.setData(data);
        photoRepository.save(photo);
        return photo;
    }
}
