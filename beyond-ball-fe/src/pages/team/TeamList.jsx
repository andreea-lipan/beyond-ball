import UserCard from "./UserCard.jsx";
import {QuizCard} from "../quizzes/view/QuizCard.jsx";
import {Typography} from "@mui/material";

const TeamList = ({team}) => {
    return (
        <>
            {team.length > 0 ?
                team?.map((user) => {
                    return <UserCard user={user}/>
                })
                :
                <Typography variant="h2" sx={{padding: 4}}>
                    There are no members yet. Ask the administrator to add some!
                </Typography>
            }
        </>

    )
}

export default TeamList;