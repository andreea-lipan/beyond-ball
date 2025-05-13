package diss.beyondballbe.services;


import diss.beyondballbe.model.DTOs.ClipDTO;
import diss.beyondballbe.model.DTOs.UploadClipRequest;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface ClipService {

    ClipDTO uploadClip(UploadClipRequest uploadClipRequest, MultipartFile file)  throws IOException;

}
