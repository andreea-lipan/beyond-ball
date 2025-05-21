package diss.beyondballbe.services;


import diss.beyondballbe.model.Clip;
import diss.beyondballbe.model.DTOs.ClipDTO;
import diss.beyondballbe.model.DTOs.UploadClipRequest;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface ClipService {
    ClipDTO uploadClip(UploadClipRequest uploadClipRequest, MultipartFile file)  throws IOException;
    List<ClipDTO> getAllClips();
    List<ClipDTO> getClipsByFolder(Long folderId);
    Clip getClipById(String id);
}
