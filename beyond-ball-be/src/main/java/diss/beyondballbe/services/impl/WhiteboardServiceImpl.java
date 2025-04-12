package diss.beyondballbe.services.impl;

import diss.beyondballbe.model.DTOs.WhiteboardCreationRequest;
import diss.beyondballbe.model.DTOs.WhiteboardResponse;
import diss.beyondballbe.model.Whiteboard;
import diss.beyondballbe.persistence.WhiteboardRepository;
import diss.beyondballbe.services.WhiteboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class WhiteboardServiceImpl implements WhiteboardService {

    @Autowired
    private WhiteboardRepository whiteboardRepository;

    @Override
    public List<WhiteboardResponse> getAllWhiteboards() {
        return whiteboardRepository.findAll()
                .stream()
                .map(WhiteboardResponse::new)
                .toList();
    }

    @Override
    public WhiteboardResponse createWhiteboard(WhiteboardCreationRequest whiteboardCreationRequest, MultipartFile file) throws IOException {

        String id = UUID.randomUUID().toString();

        String filename = id + "_" + file.getOriginalFilename()+".png";
        Path savePath = Paths.get("uploads", filename); // this resolves to /app/uploads/ in Docker

        Files.createDirectories(savePath.getParent());
        Files.write(savePath, file.getBytes());

        Whiteboard whiteboard = new Whiteboard();
        whiteboard.setId(id);
        whiteboard.setTitle(whiteboardCreationRequest.getTitle());
        whiteboard.setCreationDate(LocalDateTime.now());
        whiteboard.setImageUrl(filename);
        whiteboard.setAuthor(null);

        return new WhiteboardResponse(whiteboardRepository.save(whiteboard));
    }

}
