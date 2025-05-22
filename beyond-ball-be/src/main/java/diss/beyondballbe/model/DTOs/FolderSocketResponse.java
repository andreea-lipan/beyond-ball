package diss.beyondballbe.model.DTOs;

import diss.beyondballbe.model.Folder;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FolderSocketResponse {
    private Long id;
    private String name;
    private Long parentFolderId;
    private List<FolderDTO> subfolders;

    public FolderSocketResponse(FolderDTO folderDTO) {
        this.id = folderDTO.getId();
        this.name = folderDTO.getName();
        this.subfolders = folderDTO.getSubfolders();
    }
}
