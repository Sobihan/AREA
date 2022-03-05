class User {
  final String token;
  final String username;
  final String email;
  String name;
  String lastName;
  String avatar;
  bool isGoogle;
  bool isReddit;

  User(
      {required this.token,
      required this.username,
      required this.email,
      required this.lastName,
      required this.name,
      required this.avatar,
      required this.isGoogle,
      required this.isReddit});
  factory User.fromJson(
      {required dynamic json,
      required String token,
      required isGoogle,
      required isReddit,
      required avatar}) {
    return User(
        isGoogle: isGoogle,
        isReddit: isReddit,
        token: token,
        username: json['username'],
        email: json['email'],
        lastName: json['lstName'] ?? '',
        name: json['name'] ?? '',
        avatar: avatar ?? '');
  }

  @override
  String toString() {
    final Map<String, String> data = <String, String>{
      'token': token,
      'username': username,
      'email': email,
      'lastName': lastName,
      'name': name,
      'avatar': avatar
    };

    return data.toString();
  }

  User copy() {
    User nu = User(
        avatar: avatar,
        token: token,
        name: name,
        lastName: lastName,
        username: username,
        isGoogle: isGoogle,
        isReddit: isReddit,
        email: email);
    return nu;
  }

  bool isNotEqual(User other) {
    if (other.avatar != avatar ||
        other.lastName != other.lastName ||
        other.name != name) return true;
    return false;
  }
}
