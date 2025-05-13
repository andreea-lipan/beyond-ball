package diss.beyondballbe.services.impl;

import diss.beyondballbe.model.Clip;
import diss.beyondballbe.model.DTOs.ClipDTO;
import diss.beyondballbe.model.DTOs.UploadClipRequest;
import diss.beyondballbe.model.accounts.UserAccount;
import diss.beyondballbe.persistence.ClipRepository;
import diss.beyondballbe.services.ClipService;
import diss.beyondballbe.services.UserAccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDateTime;
import java.util.UUID;

@Service
public class ClipServiceImpl implements ClipService {

    @Autowired
    private UserAccountService userAccountService;

    @Autowired
    private ClipRepository clipRepository;

    @Override
    public ClipDTO uploadClip(UploadClipRequest uploadClipRequest, MultipartFile file) throws IOException {
        UserAccount author = userAccountService.getAccountById(uploadClipRequest.getPlayer());
        String teamId = author.getTeam().getId().toString();

        String id = UUID.randomUUID().toString();

        String filename = id + "_" + file.getOriginalFilename();
        Path savePath = Paths.get("uploads", teamId, "clips", filename); // this resolves to /app/uploads/teamId/clips in Docker

        Files.createDirectories(savePath.getParent());
//        Files.write(savePath, file.getBytes());

        Files.copy(file.getInputStream(), savePath, StandardCopyOption.REPLACE_EXISTING);

        Clip clip = new Clip();
        clip.setId(id);
        clip.setTitle(uploadClipRequest.getTitle());
        clip.setCreationDate(LocalDateTime.now());
        clip.setClipUrl(filename);
        clip.setAuthor(author);

        return new ClipDTO(clipRepository.save(clip));
    }
}
