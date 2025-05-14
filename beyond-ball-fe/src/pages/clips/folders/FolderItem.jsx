import {TreeItem} from "@mui/x-tree-view/TreeItem";
import {Button} from "@mui/material";

const FolderItem = ({ folder }) => {

    return(
        <TreeItem itemId={folder.id} label={folder.name}>
            {folder.subfolders?.map((subfolder) => (
                <FolderItem key={subfolder.id} folder={subfolder} />
            ))}
        </TreeItem>
    )
}

export default FolderItem