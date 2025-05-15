package diss.beyondballbe.services.impl;

import diss.beyondballbe.model.Clip;
import diss.beyondballbe.model.DTOs.ClipDTO;
import diss.beyondballbe.model.DTOs.UploadClipRequest;
import diss.beyondballbe.model.Folder;
import diss.beyondballbe.model.accounts.UserAccount;
import diss.beyondballbe.persistence.ClipRepository;
import diss.beyondballbe.security.AuthValidator;
import diss.beyondballbe.services.ClipService;
import diss.beyondballbe.services.FolderService;
import diss.beyondballbe.services.UserAccountService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class ClipServiceImpl implements ClipService {

    @Autowired
    private UserAccountService userAccountService;

    @Autowired
    private ClipRepository clipRepository;

    @Autowired
    private AuthValidator authValidator;

    @Autowired
    private FolderService folderService;

    @Override
    public ClipDTO uploadClip(UploadClipRequest uploadClipRequest, MultipartFile file) throws IOException {
        UserAccount author = userAccountService.getAccountById(uploadClipRequest.getPlayer());
        String teamId = author.getTeam().getId().toString();

        String id = UUID.randomUUID().toString();
        System.out.println(file.getOriginalFilename());
        if (!validateClipExtensions(file.getOriginalFilename())) {
            throw new IOException("Invalid file type. Allowed types: mp4, avi, mov, mkv");
        }
        String filename = id + "_" + file.getOriginalFilename();
        Path savePath = Paths.get("uploads", teamId, "clips", filename); // this resolves to /app/uploads/teamId/clips in Docker

        Files.createDirectories(savePath.getParent());
//        Files.write(savePath, file.getBytes());

        Files.copy(file.getInputStream(), savePath, StandardCopyOption.REPLACE_EXISTING);

        Folder folder = folderService.getFolderById(uploadClipRequest.getFolderId());

        Clip clip = new Clip();
        clip.setId(id);
        clip.setTitle(uploadClipRequest.getTitle());
        clip.setCreationDate(LocalDateTime.now());
        clip.setClipUrl(filename);
        clip.setAuthor(author);
        clip.setFolder(folder);

        return new ClipDTO(clipRepository.save(clip));
    }

    private Boolean validateClipExtensions(String filename) {
        String[] allowedExtensions = {"mp4", "avi", "mov", "mkv"};
        String fileExtension = filename.substring(filename.lastIndexOf(".") + 1).toLowerCase();
        for (String extension : allowedExtensions) {
            if (fileExtension.equals(extension)) {
                return true;
            }
        }
        return false;
    }

    @Override
    public List<ClipDTO> getAllClips() {
        return clipRepository.findAll().stream()
                .filter(clip -> authValidator.belongsToTeam(clip.getAuthor().getTeam().getId()))
                .map(ClipDTO::new)
                .toList();
    }

    @Override
    public List<ClipDTO> getClipsByFolder(Long folderId) {
        return clipRepository.findAllByFolderId(folderId).stream()
                .filter(clip -> authValidator.belongsToTeam(clip.getAuthor().getTeam().getId()))
                .map(ClipDTO::new)
                .toList();
    }

    @Override
    public Clip getClipById(String id) {
        return clipRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Clip not found"));
    }
}
