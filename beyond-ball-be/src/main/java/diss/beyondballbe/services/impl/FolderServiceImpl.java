package diss.beyondballbe.services.impl;

import diss.beyondballbe.model.DTOs.FolderCreationRequest;
import diss.beyondballbe.model.DTOs.FolderDTO;
import diss.beyondballbe.model.Folder;
import diss.beyondballbe.model.Team;
import diss.beyondballbe.persistence.FolderRepository;
import diss.beyondballbe.security.AuthValidator;
import diss.beyondballbe.services.FolderService;
import diss.beyondballbe.services.UserAccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FolderServiceImpl implements FolderService {

    @Autowired
    private FolderRepository folderRepository;

    @Autowired
    private UserAccountService userAccountService;

    @Autowired
    private AuthValidator authValidator;

    public Folder createFolder(FolderCreationRequest folderCreationRequest) {
        Folder parent = null;
        if (folderCreationRequest.getParentFolderId() != null) {
            parent = folderRepository.findById(folderCreationRequest.getParentFolderId()).orElse(null);
        }

        Team team = userAccountService.getAccountById(folderCreationRequest.getUserId()).getTeam();

        Folder folder = new Folder();
        folder.setName(folderCreationRequest.getName());
        folder.setTeam(team);

        if (parent == null) {
            folder.setIsRoot(true);
        }

        Folder savedFolder = folderRepository.save(folder);

        if (parent != null) {
            parent.getSubfolders().add(savedFolder);
            folderRepository.save(parent);
        }

        return savedFolder;
    }

    @Override
    public Folder getFolderById(Long id) {
        return folderRepository.findById(id).orElse(null);
    }

    public List<FolderDTO> getFolderTree() {
        return folderRepository.findFoldersByIsRoot(true).stream()
                .filter(folder -> authValidator.belongsToTeam(folder.getTeam().getId()))
                .map(FolderDTO::new)
                .toList();
    }

}
