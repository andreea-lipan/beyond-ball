package diss.beyondballbe.services.impl;

import diss.beyondballbe.model.DTOs.WhiteboardCreationRequest;
import diss.beyondballbe.model.DTOs.WhiteboardResponse;
import diss.beyondballbe.model.Whiteboard;
import diss.beyondballbe.model.accounts.UserAccount;
import diss.beyondballbe.persistence.WhiteboardRepository;
import diss.beyondballbe.services.UserAccountService;
import diss.beyondballbe.services.WhiteboardService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
import java.util.UUID;

@Service
public class WhiteboardServiceImpl implements WhiteboardService {

    @Autowired
    private WhiteboardRepository whiteboardRepository;

    @Autowired
    private UserAccountService userAccountService;

    @Override
    public List<WhiteboardResponse> getAllWhiteboards() {
        return whiteboardRepository.findAll()
                .stream()
                .filter(whiteboard -> {
                    if (whiteboard.getAuthor() == null) {
                        return false;
                    }
                    return belongsToTeam(whiteboard.getAuthor().getTeam().getId());
                })
                .map(WhiteboardResponse::new)
                .toList();
    }

    @Override
    public WhiteboardResponse createWhiteboard(WhiteboardCreationRequest whiteboardCreationRequest, MultipartFile file) throws IOException {

        UserAccount author = userAccountService.getAccountById(whiteboardCreationRequest.getPlayer());
        String teamId = author.getTeam().getId().toString();

        String id = UUID.randomUUID().toString();

        String filename = id + "_" + file.getOriginalFilename() + ".png";
        Path savePath = Paths.get("uploads", teamId, "whiteboards", filename);

        Files.createDirectories(savePath.getParent());
        Files.write(savePath, file.getBytes());

        Whiteboard whiteboard = new Whiteboard();
        whiteboard.setId(id);
        whiteboard.setTitle(whiteboardCreationRequest.getTitle());
        whiteboard.setCreationDate(LocalDateTime.now());
        whiteboard.setImageUrl(filename);
        whiteboard.setAuthor(author);

        return new WhiteboardResponse(whiteboardRepository.save(whiteboard));
    }

    @Override
    public Whiteboard getWhiteboardById(String id) {
        return whiteboardRepository.findById(id)
                .filter(whiteboard -> {
                    if (whiteboard.getAuthor() == null) {
                        return false;
                    }
                    return belongsToTeam(whiteboard.getAuthor().getTeam().getId());
                })
                .orElseThrow(() -> new EntityNotFoundException("Whiteboard not found"));
    }

    @Override
    public List<WhiteboardResponse> getWhiteboardsByTitle(String title) {
        return whiteboardRepository.findByTitleContainingIgnoreCase(title)
                .stream()
                .filter(whiteboard -> {
                    if (whiteboard.getAuthor() == null) {
                        return false;
                    }
                    return belongsToTeam(whiteboard.getAuthor().getTeam().getId());
                })
                .map(WhiteboardResponse::new)
                .toList();
    }

    private boolean belongsToTeam(Long teamId) {
        Object details = SecurityContextHolder.getContext().getAuthentication().getDetails();
        return (details instanceof Long) && Objects.equals(teamId, details);
    }

}
