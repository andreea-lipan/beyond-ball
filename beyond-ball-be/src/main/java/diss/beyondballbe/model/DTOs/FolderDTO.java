package diss.beyondballbe.model.DTOs;

import diss.beyondballbe.model.Folder;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FolderDTO {
    private Long id;
    private String name;
    private List<FolderDTO> subfolders;

    public FolderDTO(Folder folder) {
        this.id = folder.getId();
        this.name = folder.getName();

        this.subfolders = folder.getSubfolders().stream()
                .map(FolderDTO::new)
                .toList();
    }

}
