import { handleResponse } from "../config/utils.js";
import { addCard, getAllCardRequestService } from "../models/cardRequestModel.js";

export const requestCard = async (req, res, next) => {
  const initiator = req.user.userId;
  const { branchName, cardType, quantity, cardCharges, batch, status } =
    req.body;
  try {
    const newCard = await addCard(branchName, cardType, quantity, initiator,cardCharges,batch,status);
    handleResponse(res, 201, "Card created successfully", newCard);
  } catch (err) {
    next(err);
  }
};

export const getAllCard = async (req, res, next) => {
  try {
    const cards = await getAllCardRequestService();
    handleResponse(res, 200, "Cards fetched successfully", cards);
  } catch (err) {
    next(err);
  }
};

/*export const updateCardRequest = async (req, res, next) => {
  const { name, email } = req.body;
  try {
    const updatedUser = await updateCardRequestService(req.params.id, name, email);
    if (!updatedUser) return handleResponse(res, 404, "User not found");
    handleResponse(res, 200, "User updated successfully", updatedUser);
  } catch (err) {
    next(err);
  }
};*/