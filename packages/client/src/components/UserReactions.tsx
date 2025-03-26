import { useGetReactionsDictionaryQuery } from "@/api/forumApi";
import { Box, Stack, Typography } from "@mui/material";

const UserReactions = ({
  reactions = [],
  onClick,
}: {
  reactions: any[];
  onClick: (reaction: number) => void;
}) => {
  const { data = [] } = useGetReactionsDictionaryQuery({});
  // @ts-ignore
  const countReaction = reactions.reduce((acc, { reactionTypeId }) => {
    if (!acc[reactionTypeId]) {
      acc[reactionTypeId] = 1;
    } else {
      acc[reactionTypeId] = acc[reactionTypeId] + 1;
    }

    return acc;
  }, {});

  return (
    <Stack width={"100%"} direction={"row"} justifyContent={"end"} gap={"25px"}>
      {data.map(({ id, emoji }) => (
        <Stack key={id} direction={"row"} alignItems={"center"} gap={"5px"}>
          <Box
            p={"5px"}
            sx={{
              "userSelect": "none",
              "cursor": "pointer",
              ":hover": { backgroundColor: `rgba(114, 114, 114, 0.11)` },
              ":active": { backgroundColor: `rgba(114, 114, 114, 0.20)` },
            }}
            onClick={() => onClick(id)}>
            {emoji}
          </Box>
          <Typography variant={"subtitle2"}>{countReaction[id] || 0}</Typography>
        </Stack>
      ))}
    </Stack>
  );
};

export default UserReactions;
