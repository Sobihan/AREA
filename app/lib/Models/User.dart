class User {
  final String token;
  final String username;
  final String email;
  final String name;
  final String lastName;
  final String avatar;

  User(
      {required this.token,
      required this.username,
      required this.email,
      required this.lastName,
      required this.name,
      required this.avatar});
  factory User.fromJson({required dynamic json, required String token}) {
    return User(
        token: token,
        username: json['username'],
        email: json['email'],
        lastName: json['lstName'] ?? '',
        name: json['name'] ?? '',
        avatar: json['avatar'] ?? '');
  }
}
