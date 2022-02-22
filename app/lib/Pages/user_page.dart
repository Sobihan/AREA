import 'dart:convert';

import 'package:area/API/api.dart';
import 'package:area/API/google.dart';
import 'package:area/API/reddit.dart';
import 'package:area/Components/Login/background.dart';
import 'package:area/Components/User/service.dart';
import 'package:area/Models/google.dart';
import 'package:area/Models/user.dart';
import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:oauth2_client/google_oauth2_client.dart';
import 'package:oauth2_client/access_token_response.dart';

GoogleOAuth2Client googleClient = GoogleOAuth2Client(
    redirectUri:
        'com.example.area:/oauth2redirect', //Just one slash, required by Google specs
    customUriScheme: 'com.example.area');

class UserPage extends StatefulWidget {
  final String host;
  final User user;

  const UserPage({Key? key, required this.host, required this.user})
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
        serviceToken: t.refreshToken);
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
              SingleChildScrollView(
                  physics: const AlwaysScrollableScrollPhysics(),
                  padding: const EdgeInsets.symmetric(
                    horizontal: 25,
                    vertical: 120,
                  ),
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
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
                          name: "Reddit")
                    ],
                  )),
            ],
          ))
    ]));
  }
}
