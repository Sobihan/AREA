class User {
  final String token;
  final String username;
  final String email;
  final String name;
  final String lastName;
  final String avatar;
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
      required isReddit}) {
    return User(
        isGoogle: isGoogle,
        isReddit: isReddit,
        token: token,
        username: json['username'],
        email: json['email'],
        lastName: json['lstName'] ?? '',
        name: json['name'] ?? '',
        avatar: json['avatar'] ?? '');
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
}
