package diss.beyondballbe.services;

import diss.beyondballbe.model.DTOs.FolderCreationRequest;
import diss.beyondballbe.model.DTOs.FolderDTO;
import diss.beyondballbe.model.Folder;

import java.util.List;

public interface FolderService {
    Folder createFolder(FolderCreationRequest folderCreationRequest);
    Folder getFolderById(Long id);
    List<FolderDTO> getFolderTree();
}
