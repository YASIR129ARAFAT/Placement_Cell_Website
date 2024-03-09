import { getAllUsers } from "./getAllUsers.services";
const getAllAdmins = async () => {
  const getAdminsOnly = true;
  try {
    const data = await getAllUsers(getAdminsOnly);
    return data;
  } catch (error) {
    console.log("Failed to load all users page", error);
  }
};

export { getAllAdmins }