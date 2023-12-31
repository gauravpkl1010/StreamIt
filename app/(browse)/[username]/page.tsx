const UserPage = ({ params }: UserPageProps) => {
  return <div>User:{params.username}</div>;
};

interface UserPageProps {
  params: {
    username: string;
  };
}
