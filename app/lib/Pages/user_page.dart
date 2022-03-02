import 'dart:convert';
import 'package:area/API/api.dart';
import 'package:area/API/google.dart';
import 'package:area/API/reddit.dart';
import 'package:area/Components/Login/background.dart';
import 'package:area/Components/User/numbers.dart';
import 'package:area/Components/User/profile.dart';
import 'package:area/Components/User/service.dart';
import 'package:area/Models/google.dart';
import 'package:area/Models/user.dart';
import 'package:area/Pages/edit_profile_page.dart';
import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:oauth2_client/google_oauth2_client.dart';
import 'package:oauth2_client/access_token_response.dart';

GoogleOAuth2Client googleClient = GoogleOAuth2Client(
    redirectUri:
        'com.example.area:/oauth2redirect', //Just one slash, required by Google specs
    customUriScheme: 'com.example.area');

//ignore: must_be_immutable
class UserPage extends StatefulWidget {
  final String host;
  User user;

  UserPage({Key? key, required this.host, required this.user})
      : super(key: key);
  @override
  State<UserPage> createState() => _UserPageState();
}

class _UserPageState extends State<UserPage> {
  void gButtonPressedLogin() async {
    AccessTokenResponse t;
    try {
      t = await googleClient.getTokenWithAuthCodeFlow(
          clientId:
              "789963154068-fkl9gdj0d898pcs5poa63av7fegto54b.apps.googleusercontent.com",
          scopes: [
            "https://www.googleapis.com/auth/userinfo.email",
            "https://www.googleapis.com/auth/gmail.readonly",
            "https://www.googleapis.com/auth/userinfo.profile"
          ]);
    } catch (error) {
      return;
    }
    final responseService = await updateApi(
        token: widget.user.token,
        host: widget.host,
        type: 'GOOGLE',
        serviceToken: t.refreshToken,
        accessToken: t.accessToken!);
    if (responseService.statusCode != 200) return;
    setState(() {
      widget.user.isGoogle = true;
    });
  }

  void gButtonPressedSignOut() async {
    return;
  }

  void rbuttonPressed() async {
    String response = await getRedditCode();
    if (response == "error") return;
    String code = Uri.parse(response).queryParameters['code']!;
    final responseAPI = await updateApi(
        token: widget.user.token,
        host: widget.host,
        type: 'REDDIT',
        serviceToken: code);
    if (responseAPI.statusCode != 200) return;
    setState(() {
      widget.user.isReddit = true;
    });
  }

  void reload() async {
    final responseUser =
        await getUser(token: widget.user.token, host: widget.host);
    final serviceResponse =
        await getUserServices(token: widget.user.token, host: widget.host);

    final jsonService = jsonDecode(serviceResponse.body);
    User user = User.fromJson(
        avatar: jsonDecode(responseUser.body)['user']['avatar'] == null ||
                jsonDecode(responseUser.body)['user']['avatar'] == ''
            ? 'null'
            : jsonDecode(responseUser.body)['user']['avatar'],
        token: widget.user.token,
        json: jsonDecode(responseUser.body)['user'],
        isGoogle: jsonService['google'],
        isReddit: jsonService['reddit']);
    setState(() {
      widget.user = user;
    });
  }

  Widget buildName() {
    return Column(
      children: [
        Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text(
              "${widget.user.name} ${widget.user.lastName}",
              style: const TextStyle(
                  color: Colors.white,
                  fontWeight: FontWeight.bold,
                  fontSize: 24),
            ),
            const SizedBox(width: 10),
            GestureDetector(
                onTap: () => reload(),
                child: const Icon(FontAwesomeIcons.redo,
                    color: Colors.white, size: 15))
          ],
        ),
        widget.user.username != widget.user.email
            ? Text(
                "@${widget.user.username}",
                style: const TextStyle(color: Colors.white),
              )
            : const SizedBox.shrink(),
        Text(
          widget.user.email,
          style: const TextStyle(color: Colors.white60),
        )
      ],
    );
  }

  void onClick() async {
    var result = await Navigator.of(context).push(MaterialPageRoute(
        builder: (context) => EditProfilPage(user: widget.user)));
    if (result == null) return;
    User newUser = result as User;
    if (widget.user.isNotEqual(newUser) == false) return;
    final response = await update(user: newUser, host: widget.host);
    if (response.statusCode != 200) return;
    setState(() {
      widget.user.lastName = newUser.lastName;
      widget.user.name = newUser.name;
      widget.user.avatar = newUser.avatar;
    });
  }

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
        child: Stack(children: <Widget>[
      Container(
          height: double.infinity,
          width: double.infinity,
          decoration: background(),
          child: Column(
            children: [
              Align(
                alignment: Alignment.topRight,
                child: IconButton(
                    onPressed: () => {Navigator.pop(context)},
                    icon: const Icon(FontAwesomeIcons.signOutAlt)),
              ),
              Profile(
                  imagePath: widget.user.avatar,
                  onClicked: () => onClick(),
                  isEdit: false),
              const SizedBox(height: 24),
              buildName(),
              const SizedBox(height: 24),
              Numbers(user: widget.user),
              const SizedBox(height: 24),
              Service(
                connect: () => {gButtonPressedLogin()},
                disconnect: () => {gButtonPressedSignOut()},
                isConnect: widget.user.isGoogle,
                host: widget.host,
                name: "Google",
                icon: const Icon(FontAwesomeIcons.google),
              ),
              const SizedBox(height: 10),
              Service(
                  connect: () => {rbuttonPressed()},
                  disconnect: () => {},
                  icon: const Icon(FontAwesomeIcons.reddit),
                  host: widget.host,
                  isConnect: widget.user.isReddit,
                  name: "Reddit"),
            ],
          ))
    ]));
  }
}
