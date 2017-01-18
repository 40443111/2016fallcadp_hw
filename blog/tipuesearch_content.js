var tipuesearch = {"pages":[{"title":"About","tags":"misc","text":"2016Fall 修課成員網誌","url":"./pages/about/"},{"title":"2017.01.12電腦輔助設計課程總結","tags":"week18","text":"課程總整理 畫圖影片 https://www.youtube.com/watch?v=wt2DI8KbQkg&t=1s https://www.youtube.com/watch?v=5hWd00Pt2IA&t=8s https://www.youtube.com/watch?v=FEyLQj3doek&t=5s https://www.youtube.com/watch?v=uiPJ2qLA-5E&t=2s https://www.youtube.com/watch?v=AlW5g4IcrYc&t=6s https://www.youtube.com/watch?v=1Kg6npJqyFg&t=14s 40443111設計二甲吳承遠 from 40443111 on Vimeo . Python3 平面四連桿機構模擬: Ubuntu 安裝 matplotlib: sudo apt-get install python3-matplotlib import math import time 利用 matplotlib 程式庫畫出 contour 輪廓 import matplotlib.pyplot as plt class Coord(object): def init (self,x,y): self.x = x self.y = y 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 def __sub__(self,other): # This allows you to substract vectors return Coord(self.x-other.x,self.y-other.y) def __repr__(self): # Used to get human readable coordinates when printing return \"Coord(%f,%f)\"%(self.x,self.y) def length(self): # Returns the length of the vector return math.sqrt(self.x**2 + self.y**2) def angle(self): # Returns the vector's angle return math.atan2(self.y,self.x) def normalize(coord): return Coord( coord.x/coord.length(), coord.y/coord.length() ) def perpendicular(coord): # Shifts the angle by pi/2 and calculate the coordinates # using the original vector length return Coord( coord.length() math.cos(coord.angle()+math.pi/2), coord.length() math.sin(coord.angle()+math.pi/2) ) 點類別 class Point(object): # 起始方法 def init (self, x, y): self.x = x self.y = y 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 # 加入 Eq 方法 def Eq(self, pt): self.x = pt.x self.y = pt.y # 加入 setPoint 方法 def setPoint(self, px, py): self.x = px self.y = py # 加上 distance(pt) 方法, 計算點到 pt 的距離 def distance(self, pt): self.pt = pt x = self.x - self.pt.x y = self.y - self.pt.y return math.sqrt(x * x + y * y) Line 類別物件 class Line(object): 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40 41 42 43 44 45 46 47 48 49 50 51 52 53 54 55 56 57 58 59 # 起始方法 def __init__(self, p1, p2): self.p1 = p1 self.p2 = p2 # 直線的第一點, 設為線尾 self.Tail = self.p1 # 直線組成的第二點, 設為線頭 self.Head = self.p2 # 直線的長度屬性 self.length = math.sqrt(math.pow(self.p2.x-self.p1.x, 2)+math.pow(self.p2.y-self.p1.y,2)) # setPP 以指定頭尾座標點來定義直線 def setPP(self, p1, p2): self.p1 = p1 self.p2 = p2 self.Tail = self.p1 self.Head = self.p2 self.length = math.sqrt(math.pow(self.p2.x-self.p1.x, 2)+math.pow(self.p2.y-self.p1.y,2)) # setRT 方法 for Line, 應該已經確定 Tail 點, 然後以 r, t 作為設定 Head 的參考 def setRT(self, r, t): self.r = r self.t = t x = self.r * math.cos(self.t) y = self.r * math.sin(self.t) self.Tail.Eq(self.p1) self.Head.setPoint(self.Tail.x + x,self.Tail.y + y) # getR 方法 for Line def getR(self): # x 分量與 y 分量 x = self.p1.x - self.p2.x y = self.p1.y - self.p2.y return math.sqrt(x * x + y * y) # 根據定義 atan2(y,x), 表示 (x,y) 與 正 x 軸之間的夾角, 介於 pi 與 -pi 間 def getT(self): x = self.p2.x - self.p1.x y = self.p2.y - self.p1.y if (math.fabs(x) < math.pow(10,-100)): if(y < 0.0): return (-math.pi/2) else: return (math.pi/2) else: return math.atan2(y, x) # setTail 方法 for Line def setTail(self, pt): self.pt = pt self.Tail.Eq(pt) self.Head.setPoint(self.pt.x + self.x, self.pt.y + self.y) # getHead 方法 for Line def getHead(self): return self.Head def getTail(self): return self.Tail class Link(Line): def init (self, p1, p2): self.p1 = p1 self.p2 = p2 self.length = math.sqrt(math.pow((self.p2.x - self.p1.x), 2) + math.pow((self.p2.y - self.p1.y), 2)) class Triangle(object): def init (self, p1, p2, p3): self.p1 = p1 self.p2 = p2 self.p3 = p3 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40 41 42 43 44 45 46 47 48 49 50 51 52 53 54 55 56 57 58 59 60 61 62 63 64 65 66 67 68 69 70 71 72 73 74 75 76 77 78 79 80 81 82 83 84 85 86 87 88 89 90 91 92 93 94 95 96 97 98 99 100 101 102 103 104 105 106 107 108 109 def getLenp3(self): p1 = self.p1 ret = p1.distance(self.p2) return ret def getLenp1(self): p2 = self.p2 ret = p2.distance(self.p3) return ret def getLenp2(self): p1 = self.p1 ret = p1.distance(self.p3) return ret # 角度 def getAp1(self): ret = math.acos(((self.getLenp2() * self.getLenp2() + self.getLenp3() * self.getLenp3()) - self.getLenp1() * self.getLenp1()) / (2* self.getLenp2() * self.getLenp3())) return ret def getAp2(self): ret =math.acos(((self.getLenp1() * self.getLenp1() + self.getLenp3() * self.getLenp3()) - self.getLenp2() * self.getLenp2()) / (2* self.getLenp1() * self.getLenp3())) return ret def getAp3(self): ret = math.acos(((self.getLenp1() * self.getLenp1() + self.getLenp2() * self.getLenp2()) - self.getLenp3() * self.getLenp3()) / (2* self.getLenp1() * self.getLenp2())) return ret # ends Triangle def # 透過三個邊長定義三角形 def setSSS(self, lenp3, lenp1, lenp2): self.lenp3 = lenp3 self.lenp1 = lenp1 self.lenp2 = lenp2 self.ap1 = math.acos(((self.lenp2 * self.lenp2 + self.lenp3 * self.lenp3) - self.lenp1 * self.lenp1) / (2* self.lenp2 * self.lenp3)) self.ap2 = math.acos(((self.lenp1 * self.lenp1 + self.lenp3 * self.lenp3) - self.lenp2 * self.lenp2) / (2* self.lenp1 * self.lenp3)) self.ap3 = math.acos(((self.lenp1 * self.lenp1 + self.lenp2 * self.lenp2) - self.lenp3 * self.lenp3) / (2* self.lenp1 * self.lenp2)) # 透過兩個邊長與夾角定義三角形 def setSAS(self, lenp3, ap2, lenp1): self.lenp3 = lenp3 self.ap2 = ap2 self.lenp1 = lenp1 self.lenp2 = math.sqrt((self.lenp3 * self.lenp3 + self.lenp1 * self.lenp1) - 2* self.lenp3 * self.lenp1 * math.cos(self.ap2)) #等於 SSS(AB, BC, CA) def setSaSS(self, lenp2, lenp3, lenp1): self.lenp2 = lenp2 self.lenp3 = lenp3 self.lenp1 = lenp1 if(self.lenp1 > (self.lenp2 + self.lenp3)): #CAB 夾角為 180 度, 三點共線且 A 介於 BC 之間 ret = math.pi else : # CAB 夾角為 0, 三點共線且 A 不在 BC 之間 if((self.lenp1 < (self.lenp2 - self.lenp3)) or (self.lenp1 < (self.lenp3 - self.lenp2))): ret = 0.0 else : # 透過餘絃定理求出夾角 CAB ret = math.acos(((self.lenp2 * self.lenp2 + self.lenp3 * self.lenp3) - self.lenp1 * self.lenp1) / (2 * self.lenp2 * self.lenp3)) return ret # 取得三角形的三個邊長值 def getSSS(self): temp = [] temp.append( self.getLenp1() ) temp.append( self.getLenp2() ) temp.append( self.getLenp3() ) return temp # 取得三角形的三個角度值 def getAAA(self): temp = [] temp.append( self.getAp1() ) temp.append( self.getAp2() ) temp.append( self.getAp3() ) return temp # 取得三角形的三個角度與三個邊長 def getASASAS(self): temp = [] temp.append(self.getAp1()) temp.append(self.getLenp1()) temp.append(self.getAp2()) temp.append(self.getLenp2()) temp.append(self.getAp3()) temp.append(self.getLenp3()) return temp #2P 2L return mid P def setPPSS(self, p1, p3, lenp1, lenp3): temp = [] self.p1 = p1 self.p3 = p3 self.lenp1 = lenp1 self.lenp3 = lenp3 #bp3 is the angle beside p3 point, cp3 is the angle for line23, p2 is the output line31 = Line(p3, p1) self.lenp2 = line31.getR() #self.lenp2 = self.p3.distance(self.p1) #這裡是求角3 ap3 = math.acos(((self.lenp1 * self.lenp1 + self.lenp2 * self.lenp2) - self.lenp3 * self.lenp3) / (2 * self.lenp1 * self.lenp2)) #ap3 = math.acos(((self.lenp1 * self.lenp1 + self.lenp3 * self.lenp3) - self.lenp2 * self.lenp2) / (2 * self.lenp1 * self.lenp3)) bp3 = line31.getT() cp3 = bp3 - ap3 temp.append(p3.x + self.lenp1*math.cos(cp3))#p2.x temp.append(p3.y + self.lenp1*math.sin(cp3))#p2.y return temp 以上為相關函式物件的定義區 全域變數 midpt = Point(0, 0) tippt = Point(0, 0) contour = [] 幾何位置輸入變數 x=10 y=10 r=10 其他輸入變數 theta = 0 degree = math.pi/180.0 dx = 2 dy = 4 set p1.p2.p3.p4 position p1 = Point(150,100) p2 = Point(150,200) p3 = Point(300,300) p4 = Point(350,100) create links line1 = Link(p1,p2) line2 = Link(p2,p3) line3 = Link(p3,p4) line4 = Link(p1,p4) line5 = Link(p2,p4) link2_len = p2.distance(p3) link3_len = p3.distance(p4) triangle1 = Triangle(p1,p2,p4) triangle2 = Triangle(p2,p3,p4) def simulate(): global theta, midpt, oldpt theta += dx p2.x = p1.x + line1.length math.cos(theta degree) p2.y = p1.y - line1.length math.sin(theta degree) p3.x, p3.y = triangle2.setPPSS(p2,p4,link2_len,link3_len) # 計算垂直單位向量 a = Coord(p3.x, p3.y) b = Coord(p2.x, p2.y) normal = perpendicular(normalize(a-b)) midpt.x = (p2.x + p3.x)/2 midpt.y = (p2.y + p3.y)/2 tippt.x = midpt.x + 150 normal.x tippt.y = midpt.y + 150 normal.y # 印出座標點 #print(round(tippt.x, 2), round(tippt.y, 2)) if theta < 360: contour.append((round(tippt.x, 2), round(tippt.y, 2))) for i in range(180): simulate() 印出 contour print(contour) x_list = [x for (x, y) in contour] y_list = [y for (x, y) in contour] plt.xlabel('x coordinate') plt.ylabel('y coordinate') plt.plot(x_list, y_list) plt.show() Solvespace 1. Parts (零件繪製) 範例檔案: http://solvespace.com/bracket.pl An introductory tutorial is available, in which we draw the same part that is shown in the demo video. This covers most of the basic features of SolveSpace, including sketches, constraints, extrusions, and Boolean operations. When we first run SolveSpace, we will begin with an empty part. Initially, our view of the part will be oriented onto the XY plane; the label for that plane is displayed at the bottom left of the screen (#XY, in dark grey). The axes are also indicated by the three colored arrows at the bottom left; the X, Y, and Z axes are drawn in red, green, and blue respectively. When we hover the mouse over any entity, constraint, or other object in the sketch, that object will appear highlighted in yellow. For example, the XY plane, which is drawn as a dashed square, will appear highlighted when we hover the mouse over it. The YZ and ZX planes initially look like dashed lines, because they are being viewed on edge; but they still appear highlighted in yellow when we hold the mouse over them. It is similarly possible to highlight the X, Y, and Z axes (which are drawn as arrows), or the origin (which like all points is drawn as a green square). Extrude (平行長出或除料) Lathe (旋轉繞行長出或除料) Export Triangle Mesh STL 格式 將零件檔案轉出 STL 格式後 (binary or ASCII format definitions), 進入倉儲後, 利用 Github 內建的 stl viewer 功能 展示. three.js 2. Assembly (零件組立) http://solvespace.com/box.pl 3. Linkages (fourbar & multilink) (四連桿與多連桿運動模擬) 四連桿: 多連桿: http://solvespace.com/linkage.pl 4. Compiled & API (編譯與延伸應用) 使用 Virtualbox 虛擬主機執行 Windows 64 位元與 Ubuntu 64 位元環境中的編譯與延伸應用. Virtualbox Ubuntu 64位元虛擬檔案: http://140.130.17.17/public/Ubuntu/1604_solvespace_final/Ubuntu_160464.vdi (只有在區網可以下載). 如何用 slovespace 繪製小方塊 以下是我畫的零件 支架 按右鍵存檔即可 固定塊 按右鍵存檔即可 本體 按右鍵存檔即可 支架 按右鍵存檔即可 3D印表機零件 支柱 連接桿 底盤 圓盤 本體 固定塊","url":"./20170112dian-nao-fu-zhu-she-ji-ke-cheng-zong-jie.html"},{"title":"2016.12.22第十五週","tags":"week15","text":"3D印表機完成 3D印表機零件 支柱 連接桿 底盤 圓盤 本體","url":"./20161222di-shi-wu-zhou.html"},{"title":"2016.12.15第十四週","tags":"week14","text":"2016Fall Solvespace 小方塊完成 本體 按右鍵存檔即可:)) 支架 按右鍵存檔即可 固定塊 按右鍵存檔即可","url":"./20161215di-shi-si-zhou.html"},{"title":"2016.12.01第十二週","tags":"week12","text":"2016Fall Solvespace 教學2 如何用 slovespace 繪製小方塊 以下是我畫的零件 支架 按右鍵存檔即可 固定塊 按右鍵存檔即可","url":"./20161201di-shi-er-zhou.html"},{"title":"2016.11.24第十一週","tags":"week11","text":"2016Fall Solvespace 教學 Solvespace 1. Parts (零件繪製) 範例檔案: http://solvespace.com/bracket.pl An introductory tutorial is available, in which we draw the same part that is shown in the demo video. This covers most of the basic features of SolveSpace, including sketches, constraints, extrusions, and Boolean operations. When we first run SolveSpace, we will begin with an empty part. Initially, our view of the part will be oriented onto the XY plane; the label for that plane is displayed at the bottom left of the screen (#XY, in dark grey). The axes are also indicated by the three colored arrows at the bottom left; the X, Y, and Z axes are drawn in red, green, and blue respectively. When we hover the mouse over any entity, constraint, or other object in the sketch, that object will appear highlighted in yellow. For example, the XY plane, which is drawn as a dashed square, will appear highlighted when we hover the mouse over it. The YZ and ZX planes initially look like dashed lines, because they are being viewed on edge; but they still appear highlighted in yellow when we hold the mouse over them. It is similarly possible to highlight the X, Y, and Z axes (which are drawn as arrows), or the origin (which like all points is drawn as a green square). Extrude (平行長出或除料) Lathe (旋轉繞行長出或除料) Export Triangle Mesh STL 格式 將零件檔案轉出 STL 格式後 (binary or ASCII format definitions), 進入倉儲後, 利用 Github 內建的 stl viewer 功能 展示. three.js 2. Assembly (零件組立) http://solvespace.com/box.pl 3. Linkages (fourbar & multilink) (四連桿與多連桿運動模擬) 四連桿: 多連桿: http://solvespace.com/linkage.pl 4. Compiled & API (編譯與延伸應用) 使用 Virtualbox 虛擬主機執行 Windows 64 位元與 Ubuntu 64 位元環境中的編譯與延伸應用. Virtualbox Ubuntu 64位元虛擬檔案: http://140.130.17.17/public/Ubuntu/1604_solvespace_final/Ubuntu_160464.vdi (只有在區網可以下載).","url":"./20161124di-shi-yi-zhou.html"},{"title":"1117","tags":"hw","text":"","url":"./1117.html"},{"title":"2016-11-17第十週","tags":"week10","text":"Python3 平面四連桿機構模擬: Ubuntu 安裝 matplotlib: sudo apt-get install python3-matplotlib import math import time 利用 matplotlib 程式庫畫出 contour 輪廓 import matplotlib.pyplot as plt class Coord(object): def init (self,x,y): self.x = x self.y = y 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 def __sub__(self,other): # This allows you to substract vectors return Coord(self.x-other.x,self.y-other.y) def __repr__(self): # Used to get human readable coordinates when printing return \"Coord(%f,%f)\"%(self.x,self.y) def length(self): # Returns the length of the vector return math.sqrt(self.x**2 + self.y**2) def angle(self): # Returns the vector's angle return math.atan2(self.y,self.x) def normalize(coord): return Coord( coord.x/coord.length(), coord.y/coord.length() ) def perpendicular(coord): # Shifts the angle by pi/2 and calculate the coordinates # using the original vector length return Coord( coord.length() math.cos(coord.angle()+math.pi/2), coord.length() math.sin(coord.angle()+math.pi/2) ) 點類別 class Point(object): # 起始方法 def init (self, x, y): self.x = x self.y = y 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 # 加入 Eq 方法 def Eq(self, pt): self.x = pt.x self.y = pt.y # 加入 setPoint 方法 def setPoint(self, px, py): self.x = px self.y = py # 加上 distance(pt) 方法, 計算點到 pt 的距離 def distance(self, pt): self.pt = pt x = self.x - self.pt.x y = self.y - self.pt.y return math.sqrt(x * x + y * y) Line 類別物件 class Line(object): 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40 41 42 43 44 45 46 47 48 49 50 51 52 53 54 55 56 57 58 59 # 起始方法 def __init__(self, p1, p2): self.p1 = p1 self.p2 = p2 # 直線的第一點, 設為線尾 self.Tail = self.p1 # 直線組成的第二點, 設為線頭 self.Head = self.p2 # 直線的長度屬性 self.length = math.sqrt(math.pow(self.p2.x-self.p1.x, 2)+math.pow(self.p2.y-self.p1.y,2)) # setPP 以指定頭尾座標點來定義直線 def setPP(self, p1, p2): self.p1 = p1 self.p2 = p2 self.Tail = self.p1 self.Head = self.p2 self.length = math.sqrt(math.pow(self.p2.x-self.p1.x, 2)+math.pow(self.p2.y-self.p1.y,2)) # setRT 方法 for Line, 應該已經確定 Tail 點, 然後以 r, t 作為設定 Head 的參考 def setRT(self, r, t): self.r = r self.t = t x = self.r * math.cos(self.t) y = self.r * math.sin(self.t) self.Tail.Eq(self.p1) self.Head.setPoint(self.Tail.x + x,self.Tail.y + y) # getR 方法 for Line def getR(self): # x 分量與 y 分量 x = self.p1.x - self.p2.x y = self.p1.y - self.p2.y return math.sqrt(x * x + y * y) # 根據定義 atan2(y,x), 表示 (x,y) 與 正 x 軸之間的夾角, 介於 pi 與 -pi 間 def getT(self): x = self.p2.x - self.p1.x y = self.p2.y - self.p1.y if (math.fabs(x) < math.pow(10,-100)): if(y < 0.0): return (-math.pi/2) else: return (math.pi/2) else: return math.atan2(y, x) # setTail 方法 for Line def setTail(self, pt): self.pt = pt self.Tail.Eq(pt) self.Head.setPoint(self.pt.x + self.x, self.pt.y + self.y) # getHead 方法 for Line def getHead(self): return self.Head def getTail(self): return self.Tail class Link(Line): def init (self, p1, p2): self.p1 = p1 self.p2 = p2 self.length = math.sqrt(math.pow((self.p2.x - self.p1.x), 2) + math.pow((self.p2.y - self.p1.y), 2)) class Triangle(object): def init (self, p1, p2, p3): self.p1 = p1 self.p2 = p2 self.p3 = p3 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40 41 42 43 44 45 46 47 48 49 50 51 52 53 54 55 56 57 58 59 60 61 62 63 64 65 66 67 68 69 70 71 72 73 74 75 76 77 78 79 80 81 82 83 84 85 86 87 88 89 90 91 92 93 94 95 96 97 98 99 100 101 102 103 104 105 106 107 108 109 def getLenp3(self): p1 = self.p1 ret = p1.distance(self.p2) return ret def getLenp1(self): p2 = self.p2 ret = p2.distance(self.p3) return ret def getLenp2(self): p1 = self.p1 ret = p1.distance(self.p3) return ret # 角度 def getAp1(self): ret = math.acos(((self.getLenp2() * self.getLenp2() + self.getLenp3() * self.getLenp3()) - self.getLenp1() * self.getLenp1()) / (2* self.getLenp2() * self.getLenp3())) return ret def getAp2(self): ret =math.acos(((self.getLenp1() * self.getLenp1() + self.getLenp3() * self.getLenp3()) - self.getLenp2() * self.getLenp2()) / (2* self.getLenp1() * self.getLenp3())) return ret def getAp3(self): ret = math.acos(((self.getLenp1() * self.getLenp1() + self.getLenp2() * self.getLenp2()) - self.getLenp3() * self.getLenp3()) / (2* self.getLenp1() * self.getLenp2())) return ret # ends Triangle def # 透過三個邊長定義三角形 def setSSS(self, lenp3, lenp1, lenp2): self.lenp3 = lenp3 self.lenp1 = lenp1 self.lenp2 = lenp2 self.ap1 = math.acos(((self.lenp2 * self.lenp2 + self.lenp3 * self.lenp3) - self.lenp1 * self.lenp1) / (2* self.lenp2 * self.lenp3)) self.ap2 = math.acos(((self.lenp1 * self.lenp1 + self.lenp3 * self.lenp3) - self.lenp2 * self.lenp2) / (2* self.lenp1 * self.lenp3)) self.ap3 = math.acos(((self.lenp1 * self.lenp1 + self.lenp2 * self.lenp2) - self.lenp3 * self.lenp3) / (2* self.lenp1 * self.lenp2)) # 透過兩個邊長與夾角定義三角形 def setSAS(self, lenp3, ap2, lenp1): self.lenp3 = lenp3 self.ap2 = ap2 self.lenp1 = lenp1 self.lenp2 = math.sqrt((self.lenp3 * self.lenp3 + self.lenp1 * self.lenp1) - 2* self.lenp3 * self.lenp1 * math.cos(self.ap2)) #等於 SSS(AB, BC, CA) def setSaSS(self, lenp2, lenp3, lenp1): self.lenp2 = lenp2 self.lenp3 = lenp3 self.lenp1 = lenp1 if(self.lenp1 > (self.lenp2 + self.lenp3)): #CAB 夾角為 180 度, 三點共線且 A 介於 BC 之間 ret = math.pi else : # CAB 夾角為 0, 三點共線且 A 不在 BC 之間 if((self.lenp1 < (self.lenp2 - self.lenp3)) or (self.lenp1 < (self.lenp3 - self.lenp2))): ret = 0.0 else : # 透過餘絃定理求出夾角 CAB ret = math.acos(((self.lenp2 * self.lenp2 + self.lenp3 * self.lenp3) - self.lenp1 * self.lenp1) / (2 * self.lenp2 * self.lenp3)) return ret # 取得三角形的三個邊長值 def getSSS(self): temp = [] temp.append( self.getLenp1() ) temp.append( self.getLenp2() ) temp.append( self.getLenp3() ) return temp # 取得三角形的三個角度值 def getAAA(self): temp = [] temp.append( self.getAp1() ) temp.append( self.getAp2() ) temp.append( self.getAp3() ) return temp # 取得三角形的三個角度與三個邊長 def getASASAS(self): temp = [] temp.append(self.getAp1()) temp.append(self.getLenp1()) temp.append(self.getAp2()) temp.append(self.getLenp2()) temp.append(self.getAp3()) temp.append(self.getLenp3()) return temp #2P 2L return mid P def setPPSS(self, p1, p3, lenp1, lenp3): temp = [] self.p1 = p1 self.p3 = p3 self.lenp1 = lenp1 self.lenp3 = lenp3 #bp3 is the angle beside p3 point, cp3 is the angle for line23, p2 is the output line31 = Line(p3, p1) self.lenp2 = line31.getR() #self.lenp2 = self.p3.distance(self.p1) #這裡是求角3 ap3 = math.acos(((self.lenp1 * self.lenp1 + self.lenp2 * self.lenp2) - self.lenp3 * self.lenp3) / (2 * self.lenp1 * self.lenp2)) #ap3 = math.acos(((self.lenp1 * self.lenp1 + self.lenp3 * self.lenp3) - self.lenp2 * self.lenp2) / (2 * self.lenp1 * self.lenp3)) bp3 = line31.getT() cp3 = bp3 - ap3 temp.append(p3.x + self.lenp1*math.cos(cp3))#p2.x temp.append(p3.y + self.lenp1*math.sin(cp3))#p2.y return temp 以上為相關函式物件的定義區 全域變數 midpt = Point(0, 0) tippt = Point(0, 0) contour = [] 幾何位置輸入變數 x=10 y=10 r=10 其他輸入變數 theta = 0 degree = math.pi/180.0 dx = 2 dy = 4 set p1.p2.p3.p4 position p1 = Point(150,100) p2 = Point(150,200) p3 = Point(300,300) p4 = Point(350,100) create links line1 = Link(p1,p2) line2 = Link(p2,p3) line3 = Link(p3,p4) line4 = Link(p1,p4) line5 = Link(p2,p4) link2_len = p2.distance(p3) link3_len = p3.distance(p4) triangle1 = Triangle(p1,p2,p4) triangle2 = Triangle(p2,p3,p4) def simulate(): global theta, midpt, oldpt theta += dx p2.x = p1.x + line1.length math.cos(theta degree) p2.y = p1.y - line1.length math.sin(theta degree) p3.x, p3.y = triangle2.setPPSS(p2,p4,link2_len,link3_len) # 計算垂直單位向量 a = Coord(p3.x, p3.y) b = Coord(p2.x, p2.y) normal = perpendicular(normalize(a-b)) midpt.x = (p2.x + p3.x)/2 midpt.y = (p2.y + p3.y)/2 tippt.x = midpt.x + 150 normal.x tippt.y = midpt.y + 150 normal.y # 印出座標點 #print(round(tippt.x, 2), round(tippt.y, 2)) if theta < 360: contour.append((round(tippt.x, 2), round(tippt.y, 2))) for i in range(180): simulate() 印出 contour print(contour) x_list = [x for (x, y) in contour] y_list = [y for (x, y) in contour] plt.xlabel('x coordinate') plt.ylabel('y coordinate') plt.plot(x_list, y_list) plt.show()","url":"./2016-11-17di-shi-zhou.html"},{"title":"40443111 第二週","tags":"week2","text":"week2課程任務 week2課程任務： (未完成)利用Solvespace練習繪製零件，需繪製的零件有以下五種零件: (1) 零件繪製(3D) 影片: (2) 2D零件繪製 影片: (3) 零件組立 影片: (4) 使用約束條件繪圖 (含平面機構模擬與關鍵點座標輸出及驗證) 影片: (5) 連桿組立與模擬 影片: 心得:","url":"./40443111-di-er-zhou.html"},{"title":"40443111 第一週","tags":"week1","text":"week1課程任務 week1課程任務： (已完成)對 2016fallcadp 進行Fork(到 2016fallcadp 的頁面中，右上角有個Fork的按鈕，按完後就可完成Fork)。 (已完成)建立自己的homework，名稱為: 2016fallcadp_hw ，並且在Branch裡建立gh-pages，如不建立，將會使其他人看不見自己homework的內容，除此之外，還會導致老師的 2016fallcadp 內產生錯誤。 (已完成)創立自己的io頁面，名稱為: 40223103.github.io 。 (已完成)(因自己為組長)創立自己組的頁面，名稱為(被分配在第一組): 2016fallcadp_ag1 ，並且在Branch裡建立gh-pages。 (已完成)以上頁面均需建立index.html檔，並在index中，放置PPT的程式碼，紀錄在電腦輔助設計實習所學的課程內容。 (已完成)在 2016fallcadp_ag1 中，將組員的homework頁面加入分支中，其指令在 2016fallcpa的wiki 中，步驟為: (1) git clone https://github.com/40223103/2016fallcadp_ag1.git (將組的頁面下載下來) (2) cd 2016fallcadp_ag1(進入2016fallcadp_ag1這個資料夾) (3) git branch gh-pages(建立分支)(理解為建立一個資料夾) (4) git checkout gh-pages(簽出版本資料)(這個指令我不太明白他的意思) (5) git submodule add -b gh-pages https://github.com/40223103/2016fallcadp_hw 40223103(此處為將此連結用這個組員的學號命名)(理解為是將連結跟這個資料夾連結在一起，並且為此資料夾命名) (6) 這樣就完成近端的整合了，接下來只要push到遠端就可以了。 (第六步驟後因為忘記確切的指令的，因此尋求同學們的幫助，加上在此步驟時，產生了因錯誤指令而導致的錯誤有兩三次了，所以完成時，卻忘記再去把指令記錄下來，所以現在還需要再查詢以前的指令紀錄本，才可得知push的指令為何)。 心得: 以上內容在2016/10/13時，終於全部完成了，雖然這些應該在幾個禮拜前就需要完成的事情，卻因為不確定用甚麼指令來完成，不確定老師是將指令放在哪個頁面中，但是經由問同學跟老師後，才一一了解。 解決問題的過程: 由於在傳送指令的過程中，頻頻出錯，還用錯誤的方式來刪除，導致了因沒有將自己的homework建立gh-pages，而在建立組的頁面中，我的homework分支產生問題，又直接在近端的資料夾中，直接刪掉自己的分支(資料夾)，所以一直無法重新將自己的homework頁面與組的頁面產生連結，詢問老師後才明白，我用了錯誤的方式刪掉錯誤的資料，而且在隱藏檔案.git中，我並沒有刪掉裡面的隱藏檔，加上其他的紀錄檔中，未刪除其資料，所以導致一直錯誤，後來我只刪除.git裡的自己分支檔的檔案後，就可以重新建立分支了，好險這時已經有傻傻的將homework的gh-pages建立起來了(那時還不太明白建立這個的用意)，不然又要不斷重來之後才會發現問題了。","url":"./40443111-di-yi-zhou.html"},{"title":"40443111 期中前課程總整理","tags":"期中前課程總整理","text":"課程總整理 week1 分組並且進行對老師帳號的Fork。 建立自己的homework頁面(名稱: 2016fallcadp_hw )。 建立一個io的頁面(名稱: 40223103.github.io )。 組長則還須建立一個組的頁面(名稱: 2016fallcadp_ag1 )。 並且將其他組員的homework頁面納入組裡的頁面分支。 week2 利用Solvespace練習繪製零件，需繪製的零件有以下五種零件: 零件繪製(3D) 2D零件繪製 零件組立 使用約束條件繪圖 (含平面機構模擬與關鍵點座標輸出及驗證) 連桿組立與模擬 week3 創立 Onshape 的帳號(用學校電子信箱)。 利用Onshape重新繪製 week2 所繪製的零件。 比較這兩個軟體所繪製零件的差異。","url":"./40443111-qi-zhong-qian-ke-cheng-zong-zheng-li.html"}]};