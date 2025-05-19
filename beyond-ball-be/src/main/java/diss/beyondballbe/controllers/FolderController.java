package diss.beyondballbe.controllers;

import diss.beyondballbe.model.DTOs.FolderCreationRequest;
import diss.beyondballbe.model.DTOs.FolderDTO;
import diss.beyondballbe.model.Folder;
import diss.beyondballbe.services.FolderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/folders")
public class FolderController {

    @Autowired
    private FolderService folderService;

    @PreAuthorize("hasAnyRole('STAFF', 'PLAYER', 'ADMIN')")
    @PostMapping
    public ResponseEntity<?> createFolder(
            @RequestBody FolderCreationRequest folderCreationRequest
    ) {
        return ResponseEntity.ok(new FolderDTO(folderService.createFolder(folderCreationRequest)));
    }

    @GetMapping
    public ResponseEntity<?> getAllFolders() {
        return ResponseEntity.ok(folderService.getFolderTree());
    }
}
