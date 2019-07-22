import BaseTransformer from "../../../libraries/Repository/transformer"

class UserTransformer extends BaseTransformer {
    transform(user) {
        return {
            id: user.id,
            email: user.email,
            username: user.username,
            full_name: user.fullName(),
            role: user.role,
        }
    }
}

export default new UserTransformer()
