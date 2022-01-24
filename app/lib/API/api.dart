import 'package:http/http.dart' as http;
import 'dart:convert';

void printer(String email) {
  print(email);
}

Future<http.Response> login(
    {required String host,
    required String email,
    required String password}) async {
  Uri url = Uri.parse('http://$host:8080/api/v1/authenticate');
  print(password);
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
