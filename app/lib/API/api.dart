import 'package:area/Models/area.dart';
import 'package:area/Models/google.dart';
import 'package:area/Models/user.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

Future<http.Response> login(
    {required String host,
    required String email,
    required String password}) async {
  Uri url = Uri.parse('http://$host:8080/api/v1/authenticate');
  final response = await http.post(url,
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode(<String, String>{'email': email, 'password': password}));
  return response;
}

Future<http.Response> register(
    {required String username,
    required String email,
    required String password,
    required String host}) async {
  Uri url = Uri.parse('http://$host:8080/api/v1/register');
  final response = await http.post(url,
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode(<String, String>{
        'email': email,
        'password': password,
        'username': username
      }));
  return response;
}

Future<http.Response> getUser(
    {required String token, required String host}) async {
  Uri url = Uri.parse('http://$host:8080/api/v1/get-user-data');
  final response = await http.get(url, headers: {'authToken': token});
  return response;
}

Future<http.Response> signInWithGoogle(
    {required Google user, required String host}) async {
  Uri url = Uri.parse('http://$host:8080/api/v1/google-auth');
  final response = await http.post(
    url,
    headers: {'Content-Type': 'application/json'},
    body: user.toJson(),
  );
  print(response.body);
  return response;
}

Future<http.Response> getActionRea({required String host}) async {
  Uri url = Uri.parse('http://$host:8080/api/v1/re-action-info');
  final response = await http.get(url);
  return response;
}

Future<http.Response> createUpdate(
    {required Area area, required String host, required String token}) async {
  Uri url = Uri.parse('http://$host:8080/api/v1/update-job');
  final response = await http.post(url,
      headers: {'Content-Type': 'application/json', 'authToken': token},
      body: jsonEncode(<String, dynamic>{
        "jobToken": area.token,
        "name": area.name,
        "action": area.action.name,
        "actionArg": area.action.config,
        "reaction": area.reaction.name,
        "reactionArg": area.reaction.config,
        "interval": int.parse(area.interval),
        "runNow": area.runNow
      }));
  return response;
}

Future<http.Response> getJobs(
    {required String token, required String host}) async {
  Uri url = Uri.parse("http://$host:8080/api/v1/search-job");
  final response = await http.post(
    url,
    body:
        jsonEncode(<String, String>{'name': '', 'action': '', 'reaction': ''}),
    headers: {'Content-Type': 'application/json', 'authToken': token},
  );
  return response;
}

Future<http.Response> deleteJob(
    {required String token,
    required String host,
    required String jobToken}) async {
  Uri url = Uri.parse("http://$host:8080/api/v1/delete-job");
  final response = await http.post(url,
      headers: {'Content-Type': 'application/json', 'authToken': token},
      body: jsonEncode({'jobToken': jobToken}));
  return response;
}

Future<http.Response> stopJob(
    {required String token,
    required String jobToken,
    required String host,
    required bool isRun}) async {
  Uri url = Uri.parse("http://$host:8080/api/v1/stop-job");
  final response = await http.post(url,
      headers: {'Content-Type': 'application/json', 'authToken': token},
      body: jsonEncode({'jobToken': jobToken, 'stop': isRun}));
  return response;
}

Future<http.Response> getUserServices(
    {required String token, required String host}) async {
  Uri url = Uri.parse("http://$host:8080/api/v1/get-user-loged-api");
  final response = await http.post(url, headers: {'authToken': token});
  return response;
}

Future<http.Response> updateApi(
    {required String token,
    required String host,
    required String type,
    required serviceToken,
    String accessToken = ""}) async {
  Uri url = Uri.parse("http://$host:8080/api/v1/update-api-token");
  final response = await http.post(url,
      headers: {'Content-Type': 'application/json', 'authToken': token},
      body: type == "GOOGLE"
          ? jsonEncode({
              'type': type,
              'token': serviceToken,
              'mobile': 'true',
              'accessToken': accessToken
            })
          : jsonEncode(
              {'type': type, 'token': serviceToken, 'mobile': 'true'}));
  print(response.body);
  print(response.statusCode);
  return response;
}

Future<http.Response> update({required User user, required String host}) async {
  Uri url = Uri.parse("http://$host:8080/api/v1/update-user-data");
  final response = await http.post(url,
      headers: {'Content-Type': 'application/json', 'authToken': user.token},
      body: jsonEncode({
        "name": user.name,
        "lstName": user.lastName,
        "avatar": user.avatar != "null" ? user.avatar : ""
      }));
  return response;
}
