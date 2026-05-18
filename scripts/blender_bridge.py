import socket
import json
import sys

def send(cmd_type, params=None, host="127.0.0.1", port=9999, timeout=15):
    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    s.settimeout(timeout)
    try:
        s.connect((host, port))
        req = json.dumps({"type": cmd_type, "params": params or {}}) + "\n"
        s.sendall(req.encode("utf-8"))
        resp = b""
        s.settimeout(timeout)
        try:
            while True:
                chunk = s.recv(8192)
                if not chunk:
                    break
                resp += chunk
                try:
                    return json.loads(resp.decode("utf-8"))
                except:
                    pass
        except socket.timeout:
            pass
        if resp:
            try:
                return json.loads(resp.decode("utf-8"))
            except:
                return {"status": "partial", "data": resp.decode("utf-8", errors="replace")}
        return {"status": "error", "message": "no response"}
    except Exception as e:
        return {"status": "error", "message": str(e)}
    finally:
        s.close()

def execute(code):
    return send("execute_code", {"code": code})

if __name__ == "__main__":
    import argparse
    parser = argparse.ArgumentParser()
    parser.add_argument("cmd", nargs="?", default="get_scene_info")
    parser.add_argument("--code", "-c", default="")
    args = parser.parse_args()
    if args.code:
        print(json.dumps(execute(args.code), indent=2))
    else:
        print(json.dumps(send(args.cmd), indent=2))
