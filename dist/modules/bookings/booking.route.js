"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const booking_controller_1 = require("./booking.controller");
const auth_middleware_1 = require("../../middleware/auth.middleware");
const router = express_1.default.Router();
const controller = new booking_controller_1.BookingController();
router.post("/bookings", (0, auth_middleware_1.authMiddleware)("user", "admin"), controller.createBooking);
router.get("/bookings", (0, auth_middleware_1.authMiddleware)("user", "admin"), controller.getBookings);
router.get("/bookings/:bookingId", (0, auth_middleware_1.authMiddleware)("user", "admin"), controller.getBooking);
router.put("/bookings/:bookingId", (0, auth_middleware_1.authMiddleware)("user", "admin"), controller.updateBooking);
exports.default = router;
//# sourceMappingURL=booking.route.js.map