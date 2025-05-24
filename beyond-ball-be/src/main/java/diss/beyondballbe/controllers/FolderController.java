package diss.beyondballbe.controllers;

import diss.beyondballbe.model.DTOs.FolderCreationRequest;
import diss.beyondballbe.model.DTOs.FolderDTO;
import diss.beyondballbe.model.DTOs.FolderSocketResponse;
import diss.beyondballbe.model.Folder;
import diss.beyondballbe.services.FolderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/api/folders")
public class FolderController {

    @Autowired
    private FolderService folderService;

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @PreAuthorize("hasAnyRole('STAFF', 'PLAYER', 'ADMIN')")
    @PostMapping
    public ResponseEntity<?> createFolder(
            @RequestBody FolderCreationRequest folderCreationRequest
    ) {
        Folder createdFolder = folderService.createFolder(folderCreationRequest);
        FolderDTO folderDTO = new FolderDTO(createdFolder);
        FolderSocketResponse response = new FolderSocketResponse(folderDTO);
        response.setParentFolderId(folderCreationRequest.getParentFolderId());

        messagingTemplate.convertAndSend("/topic/" + createdFolder.getTeam().getId() + "/clips", response);

        System.out.println("Created folder: " + folderDTO);

        return ResponseEntity.ok(folderDTO);
    }

    @GetMapping
    public ResponseEntity<?> getAllFolders() {
        return ResponseEntity.ok(folderService.getFolderTree());
    }
}
