import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import React, {useEffect} from "react";
import FolderItem from "./FolderItem.jsx";


const FolderStructure = ({setSelectedFolderId, folderTree}) => {

    const defaultSelected = folderTree && folderTree.length > 0 ? folderTree[0].id : undefined;

    const handleItemSelectionToggle = (event, itemId, isSelected) => {
        if (isSelected) {
            setSelectedFolderId(itemId);
            console.log(`Selected folder ID: ${itemId}`);
        }
    };

    // Set the first folder as selected when the component loads
    useEffect(() => {
        if (folderTree && folderTree.length > 0) {
            setSelectedFolderId(folderTree[0].id);
        }
    }, []);

    return (
        <>
            <SimpleTreeView
                defaultExpanded={['root']}
                defaultCollapseIcon={<span>-</span>}
                defaultExpandIcon={<span>+</span>}
                onItemSelectionToggle={handleItemSelectionToggle}
                expansionTrigger="iconContainer"
                // by default, the first folder is selected
                defaultSelected={defaultSelected}
                sx={{
                    '& .MuiTreeItem-content': {
                        borderRadius: '4px',
                        '&:hover': {
                            backgroundColor: 'rgba(0, 0, 0, 0.08)',
                        },
                        '&.Mui-selected': {
                            backgroundColor: 'rgba(0, 0, 0, 0.2) !important',
                        },
                        '&.Mui-selected:hover': {
                            backgroundColor: 'rgba(0, 0, 0, 0.25) !important',
                        }
                    },
                    '& .MuiTreeItem-label': {
                        textAlign: 'left',
                        minWidth: 'max-content'
                    },
                    '& .MuiTreeItem-root': {
                        minWidth: 'max-content'
                    }
                }}
            >
                {folderTree?.map((folder) => (
                    <FolderItem folder={folder} key={folder.id}/>
                ))}
            </SimpleTreeView>
        </>
    );
}

export default FolderStructure;