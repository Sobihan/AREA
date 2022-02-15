import 'package:flutter_web_auth/flutter_web_auth.dart';
import 'package:area/API/globals.dart' as globals;
import 'package:http/http.dart' as http;
import 'dart:convert';

Future<String> getRedditCode() async {
  dynamic response;
  try {
    response = await FlutterWebAuth.authenticate(
        url:
            'https://www.reddit.com/api/v1/authorize?client_id=${globals.clientID}&response_type=code&state=TEST&redirect_uri=com.example.area://callback&scope=identity,account,mysubreddits,subscribe',
        callbackUrlScheme: "com.example.area");
  } catch (error) {
    return "error";
  }
  return response;
}

Future<String> signInReddit() async {
  String password = "";
  String basicAuth =
      "Basic " + base64Encode(utf8.encode('${globals.clientID}:$password'));
  final responseCode = await getRedditCode();
  if (responseCode == "error") return "error";
  Uri url = Uri.parse("https://www.reddit.com/api/v1/access_token");
  String code = Uri.parse(responseCode).queryParameters['code']!;

  final responseAuth = await http.post(url,
      headers: {
        "Authorization": basicAuth,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body:
          "grant_type=authorization_code&code=$code&redirect_uri=com.example.area://callback");
  if (responseAuth.statusCode != 200) return "error";
  Map<String, dynamic> data = jsonDecode(responseAuth.body);
  return data['access_token'].toString();
}
