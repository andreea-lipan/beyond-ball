package diss.beyondballbe.services;

import diss.beyondballbe.model.DTOs.WhiteboardCreationRequest;
import diss.beyondballbe.model.DTOs.WhiteboardResponse;
import diss.beyondballbe.model.Whiteboard;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface WhiteboardService {
    List<WhiteboardResponse> getAllWhiteboards();
    WhiteboardResponse createWhiteboard(WhiteboardCreationRequest whiteboardCreationRequest, MultipartFile file) throws IOException;
    Whiteboard getWhiteboardById(String id);
    List<WhiteboardResponse> getWhiteboardsByTitle(String title);
}
