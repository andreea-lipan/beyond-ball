import UserCard from "./UserCard.jsx";

const TeamList = ({team}) => {
    return(
        team?.map((user)=>{
            return <UserCard user={user}/>
        })

    )
}

export default TeamList;