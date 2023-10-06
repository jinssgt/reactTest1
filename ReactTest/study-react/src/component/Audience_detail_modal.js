import { useEffect, useState } from "react";
import ECharts from "echarts-for-react";

const AudienceDetailModal = () => {

    const [audienceDetail, setAudienceDetail] = useState([]);
    const [audiencePage, setAudiencePage] = useState([]);
    const [audienceChart, setAudienceChart] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // This effect will run once when the component mounts
        fetchAudienceUserDetail();
        fetchAudienceUserPage();
        fetchAudienceUserChart();
    }, []); // Provide an empty dependency array

    const fetchAudienceUserDetail = async () => {
            const clientSeq = 106659;
            const dpuid = 'cb67320ca26fd0911cc9db4ac484449eee0052dd';
        const response = await fetch(`https://api.logger.co.kr/tam-audience/user-detail?clientSeq=${clientSeq}&dpuid=${dpuid}`)
        .then((response) => response.json());

        setAudienceDetail(response.data);
        setIsLoading(false);
        console.log('audience detail data', audienceDetail && audienceDetail.length > 0 ? audienceDetail[0].sex : 'Data not available');
    }

    useEffect(()=>{
        console.log('audience detail data 2', audienceDetail && audienceDetail.length > 0 ? audienceDetail[0].last_order : 'Data not available');
        console.log('audience page data', audiencePage);
    }, [audienceDetail, audiencePage]);

    const fetchAudienceUserPage = async () => {
        const clientSeq = 106659;
        const dpuid = 'cb67320ca26fd0911cc9db4ac484449eee0052dd';
        const response = await fetch(`https://api.logger.co.kr/tam-audience/user-page?clientSeq=${clientSeq}&dpuid=${dpuid}`)
        .then((response) => response.json());

        setAudiencePage(response.data);
    }

    const [chartPvUv, setChartPvUv] = useState();
    const [chartOrdRvn, setChartOrdRvn] = useState();

    const fetchAudienceUserChart = async () => {
        const clientSeq = 106659;
        const dpuid = 'cb67320ca26fd0911cc9db4ac484449eee0052dd';
      
        try {
          const response = await fetch(
            `https://api.logger.co.kr/tam-audience/user-chart?clientSeq=${clientSeq}&dpuid=${dpuid}`
          );
      
          if (response.ok) {
            const data = await response.json();
            setAudienceChart(data.data);

            // Initialize chartPvUv here with the fetched data
            let chartPvUv = {
                tooltip: {
                    trigger: "axis",
                    axisPointer: {
                    type: "cross",
                    },
                },
                legend: {
                    data: chartPvUvCat,
                    bottom: "bottom",
                    icon: "circle",
                    itemGap: 25,
                },
                xAxis: [
                    {
                    type: 'category',
                    axisTick: {
                        alignWithLabel: true,
                    },
                    data: data.data.map(item => item.stat_date),
                    },
                ],
                yAxis: [
                    {
                    type: "value",
                    name: chartPvUvCat[0],
                    alignTicks: true,
                    axisLine: {
                        show: true,
                    },
                    },
                    {
                    type: "value",
                    name: chartPvUvCat[1],
                    alignTicks: true,
                    axisLine: {
                        show: true,
                    },
                    },
                ],
                series: [
                    {
                    name: chartPvUvCat[0],
                    type: "bar",
                    data: data.data.map(item => item.pv),
                    smooth: true,
                    },
                    {
                    name: chartPvUvCat[1],
                    type: "line",
                    yAxisIndex: 1,
                    data: data.data.map(item => item.uv),
                    symbol: "circle",
                    symbolSize: 6,
                    },
                ],
            };

            let chartOrdRvn = {
                tooltip: {
                    trigger: "axis",
                    axisPointer: {
                    type: "cross",
                    },
                },
                legend: {
                    data: chartOrdRvnCat,
                    bottom: "bottom",
                    icon: "circle",
                    itemGap: 25,
                },
                xAxis: [
                    {
                        type: 'category',
                        axisTick: {
                            alignWithLabel: true,
                        },
                        data: data.data.map(item => item.stat_date),
                    },
                ],
                yAxis: [
                    {
                        type: "value",
                        name: chartOrdRvnCat[0],
                        alignTicks: true,
                        axisLine: {
                            show: true,
                        },
                    },
                    {
                        type: "value",
                        name: chartOrdRvnCat[1],
                        alignTicks: true,
                        axisLine: {
                        show: true,
                        },
                    },
                ],
                series: [
                    {
                        name: chartOrdRvnCat[0],
                        type: "bar",
                        data: data.data.map(item => item.ord),
                        smooth: true,
                    },
                    {
                        name: chartOrdRvnCat[1],
                        type: "line",
                        yAxisIndex: 1,
                        data: data.data.map(item => item.rvn),
                        symbol: "circle",
                        symbolSize: 6,
                    },
                ],
            }
      
            // Set chartPvUv state with the newly initialized object
            setChartPvUv(chartPvUv);
            setChartOrdRvn(chartOrdRvn);
          } else {
            console.log('fetching error');
          }
        } catch (error) {
          console.log('fetching error', error);
        }
      };

    const chartPvUvCat = ["페이지수", "사용자수"];
    const chartOrdRvnCat = ["주문수", "주문금액"];

    const itemsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1);

    // Calculate the indexes for the current page
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentData = audiencePage.slice(startIndex, endIndex);

    // Calculate the total number of pages
    const totalPages = Math.ceil(audiencePage.length / itemsPerPage);

    // Function to handle page changes
    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    return (
        // <!-- 오디언스 상세 modal -->
	<div class="modal fade PrimaryModalhdbgcl default-popup-PrimaryModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel1">
	<div class="modal-dialog modal-lg">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
					<h4 class="modal-title" id="myLargeModalLabel">오디언스 상세</h4> 
				</div>

				<div class="modal-body">
					
					<div>
                        {audienceDetail=="" ? (
                            <h4 class="b fl">UID123<small>Not available</small></h4>
                        ) : (
                            <h4 class="b fl">UID123<small>Last Update : {audienceDetail[0].last_update!="" ? audienceDetail[0].last_update: '-'}</small></h4>
                        )}
						<div class="fr mt10"><span class="label label-success label-rouded"><i class="ti-face-smile"></i> 상위 10%</span> <span class="label label-warning label-rouded"><i class="ti-face-smile"></i> 상위 50%</span> <span class="label label-danger label-rouded"><i class="ti-face-sad"></i> 상위 90%</span></div>
						{audienceDetail=="" ? (
                            <p>Loading...</p>
                        ) : (
                            <table class="user_th" style={{border:'1px solid'}}>
							<tr>
								<th>이름</th>
								<td>**아직없음**</td>
								<th>성별</th>
								<td>{audienceDetail[0].sex!="" ? audienceDetail[0].sex : '-'}</td>								
							</tr>
							<tr>
								<th>이메일</th>
								<td>**아직없음**</td>
								<th>전화번호</th>
								<td>**아직없음**</td>
							</tr>
							<tr>
								<th>디바이스</th>
								<td>{audienceDetail[0].device!="" ? audienceDetail[0].device : '-'}</td>
								<th>지역</th>
								<td>{audienceDetail[0].region!="" ? audienceDetail[0].region : '-'}</td>
							</tr>
							<tr>
								<th>최근 반응한 캠페인</th>
								<td>**아직없음**</td>
								<th>최근 주문일</th>
								<td>{audienceDetail[0].last_order!="" ? audienceDetail[0].last_order : '-'}</td>
							</tr>
							<tr>
								<th>마지막 방문일</th>
								<td>{audienceDetail[0].last_visit!="" ? audienceDetail[0].last_visit : '-'}</td>
								<th>마지막 광고 유입매체</th>
								<td>**아직없음**</td>
							</tr>
							<tr>								
							</tr>
							<tr>
								<th class="bd-b">누적 방문횟수</th>
								<td class="bd-b">{audienceDetail[0].ltv_visit!="" ? audienceDetail[0].ltv_visit : '-'}</td>
								<th class="bd-b">누적 주문횟수</th>
								<td class="bd-b">{audienceDetail[0].ltv_order!="" ? audienceDetail[0].ltv_order: '-'}</td>
							</tr>
						</table>
                        )}
					</div>


					{/* <div class="chat-discussion mt20" style={{height: "auto"}}>
						<div id="myChart11" class="chart--container"  style={{minHeight:"350px;"}}></div>
					</div> */}
                    {audienceChart.length > 0 ? (
                        <>
                            <div>
                                <ECharts
                                    option={chartPvUv}
                                />
                            </div>
                            <div>
                            <ECharts
                                option={chartOrdRvn}
                            />
                            </div>
                        </>
                    ) : (
                        <p>차트 로딩중...</p>
                    )}

				  {/* <!-- user_view --> */}
					<div class="inbox-body">
					  <div class="sender-info">
						<div class="row">
						  <div class="col-md-12 mb10">
							<span class="t_blue"><strong class="font16">최근 7일간 서핑 경로</strong> <span class="font13"><span class="t-blue b ml10 t-line">최근 2일 동안 5개의 페이지를 이동하며 총 6분 4초</span>를 머물렀습니다.</span></span>
						  </div>
						</div>
					  </div>
					  <div class="col-lg-12">
						<div class="data-ep-table mb30">
							<div class="table-stlist">							
								<table class="table table-bordered table-striped" cellspacing="0" width="100%" style={{border:'1px solid'}}>
									<thead>
										<tr>
											<th>조회 일자</th>
											<th>조회 시각</th>
											<th>페이지</th>
											<th>머문 시간</th>
											<th>조회 콘텐츠</th>	
											<th>브랜드/상품명</th>
											<th>주문 상품</th>
											<th>내부 검색어</th>
										</tr>
									</thead>
									<tbody>
                                        {currentData.map((page, index) => (
                                            <tr key={index}>
                                                <td class="tc">{page.view_date!="" && page.view_date!=null ? page.view_date : '-'}</td>
                                                <td class="tc">{page.view_time!="" && page.view_time!=null ? page.view_time : '-'}</td>
                                                <td class="tl">{page.dp!="" && page.dp!=null ? page.dp : '-'}</td>
                                                <td>{page.vs!="" && page.vs!=null ? page.vs : '-'}</td>
                                                <td class="tl">{page.cp!="" && page.cp!=null ? page.cp : '-'}</td>
                                                <td class="tl">{page.mf!="" && page.mf!=null ? page.mf : '-'}</td>
                                                <td class="tl">{page.op!="" && page.op!=null ? page.op : '-'}</td>
                                                <td class="tl">{page.kw_inner!="" && page.op!=null ? page.kw_inner : '-'}</td>
                                            </tr>
                                        ))}
									</tbody>
								</table>
                                {audiencePage.data!= null ? (
                                    <div className="pagination">
                                        <button
                                        onClick={() => handlePageChange(currentPage - 1)}
                                        disabled={currentPage == 1}
                                        >
                                        Previous
                                        </button>
                                        <span>
                                        Page {currentPage} of {totalPages}
                                        </span>
                                        <button
                                        onClick={() => handlePageChange(currentPage + 1)}
                                        disabled={currentPage == totalPages}
                                        >
                                        Next
                                        </button>
                                    </div>
                                ) : (
                                    <div></div>
                                )}
							</div>
						</div>
						{/* <!-- /data table --> */}

					</div>
					  {/* <!-- div class=""> 
						 <ul class="list-unstyled timeline">
							<li>
							  <div class="block">
								<div class="tags">
								  <a href="" class="tag">
									<span>06:10 PM</span>
								  </a>
								</div>
								<div class="block_content">
								  <h2 class="title"></h2>
								  <p class="excerpt"><a href="#"><span class="users_box">http://daum.net</span></a><i class="fa fa-chevron-right"></i><a href="#" ><span class="users_box">https://www.lpoint.com/</span></a></p>
								</div>
							  </div>
							</li>
							<li>
							  <div class="block">
								<div class="tags">
								  <a href="" class="tag">
									<span>07:10 PM</span>
								  </a>
								</div>
								<div class="block_content">
								  <h2 class="title"></h2>
								  <p class="excerpt"><a href="#"><span class="users_box">https://www.google.co.kr/</span></a><i class="fa fa-chevron-right"></i><a href="#" "><span class="users_box">http://naver.com</span></a><i class="fa fa-chevron-right"></i><a href="#"><span class="users_box">https://www.lpoint.com/</span></a></p>
								</div>
							  </div>
							</li>
						  </ul>
					  </div>
					</div --> */}
				  </div>
				  {/* <!-- /user_view --> */}
				  <div class="modal-footer pr0">
					<button type="button" class="btn btn-default" data-dismiss="modal">취소</button>
					<button type="button" class="pd-setting-ed btn-main-bg btn btn-info">저장</button>
				</div>
			</div>
		</div>
	</div>
    </div>
	// <!-- // 오디언스 상세 modal -->
    )
}
export default AudienceDetailModal;