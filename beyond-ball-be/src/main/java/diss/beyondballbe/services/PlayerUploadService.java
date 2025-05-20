package diss.beyondballbe.services;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface PlayerUploadService {
    void uploadPlayerStats(MultipartFile file, Long teamId) throws IOException;

}
